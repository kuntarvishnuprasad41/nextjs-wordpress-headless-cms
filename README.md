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

## 5. Next Steps

- Implement API calls using `useDataFetchWP` hook.
- Add pagination and search handling.
- Optimize API requests using SWR or React Query.
