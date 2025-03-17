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

wp.config.php

```
define('JWT_AUTH_SECRET_KEY', 'STRONG KEY');

```

Installations:

1. JWT Authentication for WP-API
2. REST API | Custom API Generator For Cross Platform And Import Export In WP
3. WP REST API - OAuth 1.0a Server

Add the following code to your WordPress `functions.php` or a custom plugin:

```php
function save_favorite_article(WP_REST_Request $request) {
    $user_id = get_current_user_id();
    if (!$user_id) {
        return new WP_Error('not_logged_in', 'You must be logged in.', array('status' => 401));
    }

    // Get JSON input
    $params = $request->get_json_params();
    $post_id = isset($params['post_id']) ? intval($params['post_id']) : 0;

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

function remove_saved_article(WP_REST_Request $request) {
    $user_id = get_current_user_id();
    if (!$user_id) {
        return new WP_Error('not_logged_in', 'You must be logged in.', array('status' => 401));
    }

    // Get JSON input
    $params = $request->get_json_params();
    $post_id = isset($params['post_id']) ? intval($params['post_id']) : 0;

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

functions.php

```php
function custom_wp_register_user(WP_REST_Request $request) {
    $parameters = $request->get_json_params();

    $username = sanitize_text_field($parameters['username']);
    $email = sanitize_email($parameters['email']);
    $password = sanitize_text_field($parameters['password']);

    if (empty($username) || empty($email) || empty($password)) {
        return new WP_Error('missing_fields', 'Please provide username, email, and password.', ['status' => 400]);
    }

    if (username_exists($username) || email_exists($email)) {
        return new WP_Error('user_exists', 'Username or email already exists.', ['status' => 400]);
    }

    $user_id = wp_create_user($username, $password, $email);

    if (is_wp_error($user_id)) {
        return new WP_Error('registration_failed', 'User registration failed.', ['status' => 400]);
    }

    return rest_ensure_response([
        'id' => $user_id,
        'username' => $username,
        'email' => $email,
        'message' => 'User registered successfully!'
    ]);
}

function register_wp_rest_user_endpoint() {
    register_rest_route('wp/v2', '/users/register', [
        'methods'  => 'POST',
        'callback' => 'custom_wp_register_user',
        'permission_callback' => '__return_true', // Allows public access (optional)
    ]);
}

add_action('rest_api_init', 'register_wp_rest_user_endpoint');


add_filter('rest_prepare_post', function($response, $post, $request) {
    if (isset($response->data['content']['rendered'])) {
        // Get CSS from the theme's style.css
        $theme_css = file_get_contents(get_stylesheet_directory() . '/style.css');
        $style_tag = '<style>' . $theme_css . '</style>';

        // Prepend inline CSS to the content
        $response->data['content']['rendered'] = $style_tag . $response->data['content']['rendered'];
    }
    return $response;
}, 10, 3);


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


### Post Api for different pages
function exclude_categories(){
	$slugs_to_exclude = array('ad_section_one');
    $exclude_ids = array(1);
    foreach ($slugs_to_exclude as $slug) {
      $category = get_term_by('slug', $slug, 'category');
      if ($category) {
        $exclude_ids[] = $category->term_id;
      }
    return $exclude_ids;
}
}
function tag_category_posts($tag) {
    // Get categories associated with this tag
    $categories = get_categories(array(
        'hide_empty' => true,
		'exclude' => exclude_categories()
    ));

    $tag_data = array(
        'id' => $tag->term_id,
        'name' => $tag->name,
        'slug' => $tag->slug,
        'categories' => array(),
    );

    foreach ($categories as $category) {
        // Fetch posts for this tag and category (limit to 5 posts)
        $posts = get_posts(array(
            'tag_id' => $tag->term_id,
            'category' => $category->term_id,
            'numberposts' => 5, // Limit to 5 posts per category
            'orderby' => 'date',
            'order' => 'DESC',
        ));

        $category_posts = array();

        foreach ($posts as $post) {
            // Get the featured image
            $featured_image_id = get_post_thumbnail_id($post->ID);
            $featured_image_url = $featured_image_id ? wp_get_attachment_image_url($featured_image_id, 'full') : null;

            // Add the post to the category
            $category_posts[] = array(
                'id' => $post->ID,
                'title' => $post->post_title,
                'content' => $post->post_content,
                'excerpt' => $post->post_excerpt,
                'date' => $post->post_date,
                'featured_image' => $featured_image_id ? array(
                    'id' => $featured_image_id,
                    'url' => $featured_image_url
                ) : null,
            );
        }

        // Add the category and its posts to the tag data
        if (!empty($category_posts)) {
            $tag_data['categories'][] = array(
                'id' => $category->term_id,
                'name' => $category->name,
                'slug' => $category->slug,
                'posts' => $category_posts,
            );
        }
    }

    return $tag_data; // Fixed missing semicolon
}
function tag_posts_only($tags,$limit) {
    $all_tags_data = array(); // Array to store data for all tags

    foreach ($tags as $tag) {
        // Fetch posts for this tag (limit to 5 posts)
        $posts = get_posts(array(
            'tag_id' => $tag->term_id,
            'numberposts' => $limit, // Limit to 5 posts
            'orderby' => 'date',
            'order' => 'DESC',
        ));

        $tag_data = array(
            'id' => $tag->term_id,
            'name' => $tag->name,
            'slug' => $tag->slug,
            'posts' => array(),
        );

        foreach ($posts as $post) {
            // Get the featured image
            $featured_image_id = get_post_thumbnail_id($post->ID);
            $featured_image_url = $featured_image_id ? wp_get_attachment_image_url($featured_image_id, 'full') : null;

            // Add the post to the tag data
            $tag_data['posts'][] = array(
                'id' => $post->ID,
                'title' => $post->post_title,
                'content' => $post->post_content,
                'excerpt' => $post->post_excerpt,
                'date' => $post->post_date,
                'featured_image' => $featured_image_id ? array(
                    'id' => $featured_image_id,
                    'url' => $featured_image_url
                ) : null,
            );
        }

        // Add this tag's data to the array
        $all_tags_data[] = $tag_data;
    }

    return $all_tags_data; // Return data for all tags
}
function custom_get_tags_with_categories_and_posts($request) {
    // Get pagination parameters
    $per_page = $request->get_param('per_page') ? (int) $request->get_param('per_page') : 10;
    $page = $request->get_param('page') ? (int) $request->get_param('page') : 1;

    // Get tags with pagination
    $tags = get_tags(array(
        'hide_empty' => true,
        'number' => $per_page,
        'orderby' => 'count',
        'order' => 'DESC',
        'offset' => ($page - 1) * $per_page,
    ));
   
    // If no tags are found, return a 404 response
    if (empty($tags)) {
        return new WP_REST_Response(array('message' => 'No tags found'), 404);
    }

    // Process the first tag
    $data['headlinesSectionOne'] = tag_category_posts($tags[0]);
	$data['headlinesSectionTwo'] = tag_posts_only(array_slice($tags,1,2),6);
	$data['headlinesSectionThree'] = tag_posts_only(array_slice($tags,3,6),3);
    return new WP_REST_Response($data, 200);
}

function register_tag_category_posts() {
    register_rest_route('wp/v2', '/home-headlines', array(
        'methods' => 'GET',
        'callback' => 'custom_get_tags_with_categories_and_posts',
        'permission_callback' => '__return_true', // Allow public access
    ));
}
add_action('rest_api_init', 'register_tag_category_posts');


add_filter('rest_prepare_post', function($response, $post, $request) {
    if (isset($response->data['content']['rendered'])) {
        // Get CSS from the theme's style.css
        $theme_css = file_get_contents(get_stylesheet_directory() . '/style.css');
        $style_tag = '<style>' . $theme_css . '</style>';
        
        // Prepend inline CSS to the content
        $response->data['content']['rendered'] = $style_tag . $response->data['content']['rendered'];
    }
    return $response;
}, 10, 3);

function get_posts_by_parent_category_slug($request) {
    // Get the parent category slug from the request
    $parent_slug = $request->get_param('parent_slug');
    $per_page = $request->get_param('per_page') ? (int) $request->get_param('per_page') : 5;
    $page = $request->get_param('page') ? (int) $request->get_param('page') : 1;
    if (empty($parent_slug)) {
        return new WP_Error('no_parent_slug', 'Parent category slug is required.', array('status' => 400));
    }

    // Get the parent category by slug
    $parent_category = get_term_by('slug', '/'.$parent_slug, 'category');

    if (!$parent_category) {
        return new WP_Error('parent_not_found', 'Parent category not found.', array('status' => 404));
    }

    // Get child categories of the parent category
    $child_categories = get_terms(array(
        'taxonomy' => 'category',
        'parent'   => $parent_category->term_id,
        'hide_empty' => false,
    ));

    if (empty($child_categories)) {
        return new WP_Error('no_child_categories', 'No child categories found.', array('status' => 404));
    }

    // Collect posts from all child categories
    $categories_with_posts = array();
    foreach ($child_categories as $child_category) {
        $child_posts = get_posts(array(
            'category' => $child_category->term_id,
            'numberposts' => -1,
            'orderby' => 'date',
            'order' => 'DESC',
        ));

        $posts = array();
        if (!empty($child_posts)) {
            foreach ($child_posts as $post) {
                $featured_image_id = get_post_thumbnail_id($post->ID);
                $featured_image_url = $featured_image_id ? wp_get_attachment_image_src($featured_image_id, 'full')[0] : '';
                $content_without_images = preg_replace('/<img[^>]+\>/i', '', $post->post_content);
                $author_id = $post->post_author;
                $author_name = get_the_author_meta('display_name', $author_id);
                $author_slug = get_the_author_meta('user_nicename', $author_id);
                $posts[] = array(
                    'id' => $post->ID,
                    'title' => $post->post_title,
                    'content' => $content_without_images,
                    'excerpt' => $post->post_excerpt,
                    'slug' => $post->post_name,
                    'date' => $post->post_date,
                    'author' => array(
                        'id' => $author_id,
                        'name' => $author_name,
                        'slug' => $author_slug
                    ),
                    'featured_image' => $featured_image_id ? array(
                        'id' => $featured_image_id,
                        'url' => $featured_image_url
                    ) : null,
                );
            }
        }
        if(!empty($posts)){
		   $categories_with_posts[] = array(
            'name' => $child_category->name,
            'slug' => '/' . $child_category->slug,
            'posts' => $posts
        );	
		}
    }

    if (empty($categories_with_posts)) {
        return new WP_Error('no_posts', 'No posts found in child categories.', array('status' => 404));
    }

    // Prepare the final response
    $response = array(
        'name' => $parent_category->name,
        'slug' => '/' . $parent_category->slug,
        'categories' => $categories_with_posts,
    );

    return rest_ensure_response($response);
}

function register_parent_category_api_endpoint() {
    register_rest_route('wp/v2', '/parent-category-posts/', array(
        'methods' => 'GET',
        'callback' => 'get_posts_by_parent_category_slug',
        'args' => array(
            'parent_slug' => array(
                'required' => true,
                'validate_callback' => function($param, $request, $key) {
                    return !empty($param);
                },
                'sanitize_callback' => 'sanitize_text_field',
            ),
        ),
    ));
}
add_action('rest_api_init', 'register_parent_category_api_endpoint');

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

## Get post by id

```
 GET /wp-json/wp/v2/posts/123
```

##Get multiple post by id

```
GET /wp-json/wp/v2/posts?include=1,6,789
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

````

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
````
