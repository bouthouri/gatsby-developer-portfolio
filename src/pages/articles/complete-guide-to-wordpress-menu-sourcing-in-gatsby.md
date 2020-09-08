---
title: "Complete guide to Wordpress menu sourcing in Gatsby"
published_at: "11 Jul 19"
slug: "complete-guide-to-wordpress-menu-sourcing-in-gatsby-h76"
---

Using the Gatsby plugin gatsby-source-wordpress we can fetch almost everything from a Wordpress website.
There are only two things that were not there by default, the menus and the custom options.
This blog post is about menus.

## 1. Preparing the menu

As I have just mentioned, the Wordpress menu are, by default, not available on the Wordpress REST api, so the first step is to make them visible.

We can make this easily with a Wordpress plugin [WP REST API Menus](https://wordpress.org/plugins/wp-api-menus/) that you can't find when you want to install it directly from your website.

You need to download it and use WordPress Admin Plugin Upload, here's a [link](https://www.wpbeginner.com/beginners-guide/step-by-step-guide-to-install-a-wordpress-plugin-for-beginners/) to a tutorial if you don't know how the.
Now that you have installed the plugin, your menus are available on the rest api.

> [WP-REST-API V2 Menus](https://wordpress.org/plugins/wp-rest-api-v2-menus/) is not the good plugin to install.

## 2. The request:

After installing the plugin if you run `gatsby develop` a new GraphQL request will be available:

- allWordpressWpApiMenusMenus to get the menus available
- allWordpressWpApiMenusMenusItems to get the item of the menus
- allWordpressWpApiMenusMenuLocations to get the available menu location

## 3. Useful request:

There are a lot of useful requests but in our case we just need to retrieve the menus and their items "content", and this is the request for that.

```graphql
{
  allWordpressWpApiMenusMenusItems {
    edges {
      node {
        slug
        name
        items {
          title
          url
        }
      }
    }
  }
}
```

If your menu contains sub-menus use the wordpress_childer attribute

```graphql
{
  allWordpressWpApiMenusMenusItems {
    edges {
      node {
        slug
        name
        items {
          title
          url
          wordpress_children {
            title
            url
          }
        }
      }
    }
  }
}
```

If you want to retrieve a specific menu use filters like this

```graphql
{
  allWordpressWpApiMenusMenusItems(filter: { slug: { eq: "sidebar-menu" } }) {
    edges {
      node {
        slug
        name
        items {
          title
          url
          object_slug
          wordpress_children {
            title
            url
          }
        }
      }
    }
  }
}
```

## 4. Getting the menu

The complete code in a Gatsby component:
Now that we have all what we need, this is a small component to display the Wordpress menu

```jsx
import React from "react"
import { StaticQuery, graphql } from "gatsby"

export default () => (
  <StaticQuery
    query={graphql`
      query {
        allWordpressWpApiMenusMenusItems(
          filter: { slug: { eq: "sidebar-menu" } }
        ) {
          edges {
            node {
              slug
              name
              items {
                title
                url
                object_slug
                wordpress_children {
                  title
                  url
                }
              }
            }
          }
        }
      }
    `}
    render={data => {
      return (
        <nav className="menu">
          <ul className="nav flex-column">
            {data &&
              data.allWordpressWpApiMenusMenusItems &&
              data.allWordpressWpApiMenusMenusItems.edges &&
              data.allWordpressWpApiMenusMenusItems.edges[0] &&
              data.allWordpressWpApiMenusMenusItems.edges[0].node &&
              data.allWordpressWpApiMenusMenusItems.edges[0].node.items &&
              data.allWordpressWpApiMenusMenusItems.edges[0].node.items.map(
                prop => {
                  return (
                    <li className="nav-item">
                      <a
                        className="nav-link active"
                        href={prop.url}
                        alt={prop.title}
                      >
                        {prop.title}
                      </a>
                      <div className="sub-menu">
                        {prop &&
                          prop.wordpress_children &&
                          prop.wordpress_children.map(child => {
                            console.log("child ", child)

                            return (
                              <a
                                className="dropdown-item"
                                href={child.url}
                                alt={child.title}
                              >
                                {child.title}
                              </a>
                            )
                          })}
                      </div>
                    </li>
                  )
                }
              )}
          </ul>
        </nav>
      )
    }}
  />
)
```

## 5. The correct url

If your Wordpress domain name is not the same as your Gatsby website don't forget to replace them.
In gatsby-config.js put this in the plugin declaration

```json
searchAndReplaceContentUrls: {
    sourceUrl: "http://localhost:8080",
    replacementUrl: "http://localhost:8000",
}
```

here's the complete example:

```json
{
  "resolve": "gatsby-source-wordpress",
  "options": {
    "baseUrl": "http://localhost:8080/",
    "protocol": "http",
    "hostingWPCOM": false,
    "useACF": false,
    "excludedRoutes": ["**/settings", "**/themes", "**/users/me"],
    "verboseOutput": true,
    "searchAndReplaceContentUrls": {
      "sourceUrl": "http://localhost:8080",
      "replacementUrl": "http://localhost:3000"
    }
  }
}
```

## 6. Conclusion

This is not always the good approach and sometime it's overkill, but it's nice to know everything about Wordpress's menus and their use in Gatsby. You might have another opinion or a different method.
Please share your point of view with me in comment.
