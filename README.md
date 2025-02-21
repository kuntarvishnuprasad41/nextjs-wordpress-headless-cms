# Configuring wordpress

1. Install wordpress
2. Go to wp-admin
3. Install plugin GraphQl / WpGraphQl / any other which does GraphQL APIs
4. Settings-> Permalinks -> Change it to posttypes
5. Open next proj
6. copy .env.example
7. Change both the ENV to wordpress url
8. Open wordpress and graphql plugin, copy the url and paste it into NEXT_API_URL
9. Remove the plugin

## Change functions.php

```php
function get_menu_items($data) {
    $menu_name = $data['slug']; // Get menu slug from API request
    $menu = wp_get_nav_menu_object($menu_name);

    if (!$menu) {
        return new WP_Error('no_menu', 'Menu not found', ['status' => 404]);
    }

    $menu_items = wp_get_nav_menu_items($menu->term_id);

    return rest_ensure_response($menu_items);
}

function register_menu_api_routes() {
    register_rest_route('custom/v1', '/menu/(?P<slug>[a-zA-Z0-9-_]+)', [
        'methods'  => 'GET',
        'callback' => 'get_menu_items',
    ]);
}

add_action('rest_api_init', 'register_menu_api_routes');

```

# Next.js + WordPress Integration steps

---

## 1. WordPress Categories & Subcategories

To structure your content properly, configure the following **categories and subcategories** in WordPress:

### **Categories & Subcategories Hierarchy**

- **News (Main Category)**

  - Politics
  - Business
  - Science & Technology
  - Cybersecurity
  - Health
  - Startups
  - Women Entrepreneurs
  - Events
  - Enterprise
  - Spec

- **Featured Stories (Custom Tag)**

  - `featured` (For highlighting articles on the homepage)

- **ProCo Stories (Custom Tag)**
  - `proco-stories` (For articles appearing in the ProCo Stories section)

---

## 2. API Endpoints (WordPress REST API)

Below are the required API endpoints to fetch and display content dynamically.

### **Homepage Endpoints**

#### **Fetch Hero Section (Featured Story)**

```http
GET /wp-json/wp/v2/posts?tags=featured&per_page=1
```

#### **Fetch Recent Stories**

```http
GET /wp-json/wp/v2/posts?orderby=date&per_page=10
```

#### **Fetch Top Stories (Customize with a Specific Tag or Category)**

```http
GET /wp-json/wp/v2/posts?tags=top-stories&per_page=6
```

#### **Fetch Posts by Category**

```http
GET /wp-json/wp/v2/posts?categories=<category_id>&per_page=6
```

Replace `<category_id>` with the actual category ID.

#### **Fetch ProCo Stories Section**

```http
GET /wp-json/wp/v2/posts?tags=proco-stories&per_page=6
```

#### **Fetch Category List (For Navigation Menus)**

```http
GET /wp-json/wp/v2/categories
```

#### **Fetch Menus (If Using WordPress Menu System)**

```http
GET /wp-json/wp/v2/menus
```

---

### **News Display Page Endpoints**

#### **Fetch News by Category (Dynamic Page)**

```http
GET /wp-json/wp/v2/posts?categories=<category_id>&per_page=10&page=<page_number>
```

Supports **pagination** using `page=<page_number>`.

#### **Fetch Single News Article**

```http
GET /wp-json/wp/v2/posts?slug=<post_slug>
```

Replace `<post_slug>` with the actual slug of the post.

#### **Fetch Related Posts (Same Category, Excluding Current Post)**

```http
GET /wp-json/wp/v2/posts?categories=<category_id>&exclude=<post_id>&per_page=3
```

#### **Search Functionality**

```http
GET /wp-json/wp/v2/posts?search=<search_query>
```

Replace `<search_query>` with the actual search keyword.

---

## 3. Fetching & Displaying Sections in Next.js

### **Homepage Sections**

- **Hero Section** → Fetch the latest **featured** post.
- **Recent Stories** → Fetch posts ordered by date.
- **Top Stories** → Fetch posts tagged as `top-stories`.
- **Category-wise Sections** → Fetch posts based on category ID.
- **ProCo Stories** → Fetch posts tagged as `proco-stories`.
- **Newsletter Subscription** → Display a simple subscription form.

### **News Display Page**

- **Show Category-wise News** → Fetch posts dynamically using the category ID.
- **Pagination** → Support infinite scroll or numbered pagination.
- **Single News Page** → Fetch article by slug and display content.
- **Related Posts** → Show 3 related posts from the same category.
- **Search Feature** → Allow searching articles dynamically.

---

## 4. Dynamic Menus

To render menus dynamically:

1. Fetch categories using `/wp-json/wp/v2/categories`
2. Fetch menu items (if using WP menus) via `/wp-json/wp/v2/menus`
3. Map through the categories and render them in your navigation bar.

---

## 5. Reader Registration, Comments, and Article Saving

### **Enable User Registration**

#### **Register a New User**

```http
POST /wp-json/wp/v2/users/register
```

Request body:

```json
{
  "username": "exampleuser",
  "email": "user@example.com",
  "password": "securepassword"
}
```

### **User Login**

```http
POST /wp-json/jwt-auth/v1/token
```

Request body:

```json
{
  "username": "exampleuser",
  "password": "securepassword"
}
```

### **Allow Users to Comment on Articles**

#### **Fetch Comments for a Post**

```http
GET /wp-json/wp/v2/comments?post=<post_id>
```

#### **Submit a New Comment**

```http
POST /wp-json/wp/v2/comments
```

Request body:

```json
{
  "post": <post_id>,
  "content": "This is a great article!",
  "author_email": "user@example.com",
  "author_name": "John Doe"
}
```

### **Reply to a Comment**

```http
POST /wp-json/wp/v2/comments
```

Request body:

```json
{
  "post": <post_id>,
  "parent": <comment_id>,
  "content": "Thanks for your feedback!"
}
```

Header:

```
Authorization: Bearer your_jwt_token

```

# Saved Articles API

This API allows authenticated users to save, retrieve, and remove saved articles in WordPress using the REST API.

## Authentication

All requests require authentication using **JWT tokens**.

- Obtain a JWT token by logging in:
  ```http
  POST /wp-json/jwt-auth/v1/token
  Content-Type: application/json
  ```
  **Request Body:**
  ```json
  {
    "username": "your_username",
    "password": "your_password"
  }
  ```
  **Response:**
  ```json
  {
    "token": "your_jwt_token",
    "user_email": "user@example.com",
    "user_display_name": "Example User"
  }
  ```

## Endpoints

### 1. Save an Article

**Endpoint:**

```http
POST /wp-json/custom/v1/save-article
Authorization: Bearer your_jwt_token
Content-Type: application/json
```

**Request Body:**

```json
{
  "post_id": 123
}
```

**Response:**

```json
{
  "success": true,
  "saved_articles": [123, 456]
}
```

### 2. Get Saved Articles

**Endpoint:**

```http
GET /wp-json/custom/v1/saved-articles
Authorization: Bearer your_jwt_token
```

**Response:**

```json
[123, 456]
```

### 3. Remove a Saved Article

**Endpoint:**

```http
POST /wp-json/custom/v1/remove-article
Authorization: Bearer your_jwt_token
Content-Type: application/json
```

**Request Body:**

```json
{
  "post_id": 123
}
```

**Response:**

```json
{
  "success": true,
  "saved_articles": [456]
}
```

## Implementation in WordPress

### Register Custom Endpoints

Add the following code to your WordPress `functions.php` or a custom plugin:

```php
function save_favorite_article() {
    $user_id = get_current_user_id();
    if (!$user_id) {
        return new WP_Error('not_logged_in', 'You must be logged in.', array('status' => 401));
    }
    $post_id = isset($_POST['post_id']) ? intval($_POST['post_id']) : 0;
    if (!$post_id || !get_post($post_id)) {
        return new WP_Error('invalid_post', 'Invalid post ID.', array('status' => 400));
    }
    $saved_articles = get_user_meta($user_id, 'saved_articles', true);
    $saved_articles = is_array($saved_articles) ? $saved_articles : [];
    if (!in_array($post_id, $saved_articles)) {
        $saved_articles[] = $post_id;
        update_user_meta($user_id, 'saved_articles', $saved_articles);
    }
    return rest_ensure_response(['success' => true, 'saved_articles' => $saved_articles]);
}

function get_saved_articles() {
    $user_id = get_current_user_id();
    if (!$user_id) {
        return new WP_Error('not_logged_in', 'You must be logged in.', array('status' => 401));
    }
    $saved_articles = get_user_meta($user_id, 'saved_articles', true);
    return rest_ensure_response($saved_articles ?: []);
}

function remove_saved_article() {
    $user_id = get_current_user_id();
    if (!$user_id) {
        return new WP_Error('not_logged_in', 'You must be logged in.', array('status' => 401));
    }
    $post_id = isset($_POST['post_id']) ? intval($_POST['post_id']) : 0;
    $saved_articles = get_user_meta($user_id, 'saved_articles', true);
    if (($key = array_search($post_id, $saved_articles)) !== false) {
        unset($saved_articles[$key]);
        update_user_meta($user_id, 'saved_articles', array_values($saved_articles));
    }
    return rest_ensure_response(['success' => true, 'saved_articles' => $saved_articles]);
}

function register_saved_articles_routes() {
    register_rest_route('custom/v1', '/save-article', array(
        'methods' => 'POST',
        'callback' => 'save_favorite_article',
        'permission_callback' => function () {
            return is_user_logged_in();
        }
    ));

    register_rest_route('custom/v1', '/saved-articles', array(
        'methods' => 'GET',
        'callback' => 'get_saved_articles',
        'permission_callback' => function () {
            return is_user_logged_in();
        }
    ));

    register_rest_route('custom/v1', '/remove-article', array(
        'methods' => 'POST',
        'callback' => 'remove_saved_article',
        'permission_callback' => function () {
            return is_user_logged_in();
        }
    ));
}
add_action('rest_api_init', 'register_saved_articles_routes');
```
