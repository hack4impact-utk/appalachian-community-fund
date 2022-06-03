<?php
/**
* Plugin Name: ACF-Custom
* Plugin URI: None
* Description: All the custom functionality needed for the ACF webapp
* Version: 1.0.0
* Author: Harrison Hoytt
* License: GPL2
*/

// Useful: https://designmodo.com/wpdb-object-wordpress/
//         https://developer.wordpress.org/plugins/hooks/

function get_state_id($post)
{
    global $wpdb;

    $sql = 'SELECT state_id FROM acf_posts WHERE ID = %d';

    $rows = $wpdb->get_col($wpdb->prepare($sql, $post['id']));

    if (empty($rows)) {
        return null;
    }

    return $rows[0]; //get_field('state_id', $post['id']);
}

function get_address($post) 
{
    global $wpdb;

    $sql = 'SELECT post_address FROM acfc_post_addresses WHERE post_id = %d';

    $data = $wpdb->get_col($wpdb->prepare($sql, $post['id']));

    if (empty($data)) {
        return null;
    }

    return $data[0];
}

function filter_by_state($args, $state) 
{
    $args['state_id'] = $state;
    return $args;
}

function register_custom_api_fields()
{
    //State ID
    register_rest_field('post', 'state_id',
        array(
            'get_callback' => 'get_state_id',
            'schema' => null,
        )
    );

    //Address
    register_rest_field('post', 'address',
        array(
            'get_callback' => 'get_address',
            'schema' => null
        )
    );

    //This is for filtering on states
    // register_rest_route('wp/v2', 'post', array(
    //     'methods' => 'GET',
    //     'callback' => 'filter_by_state'
    // ), false );
}

add_action('rest_api_init', 'register_custom_api_fields');
add_filter('posts_results', 'filter_by_state', 10, 2);
?>