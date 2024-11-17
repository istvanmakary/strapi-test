import type { Schema, Struct } from '@strapi/strapi';

export interface MenuLink extends Struct.ComponentSchema {
  collectionName: 'components_menu_links';
  info: {
    displayName: 'Link';
    icon: 'apps';
  };
  attributes: {
    Link: Schema.Attribute.String;
    Title: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'menu.link': MenuLink;
    }
  }
}
