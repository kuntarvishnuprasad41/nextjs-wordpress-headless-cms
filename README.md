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
