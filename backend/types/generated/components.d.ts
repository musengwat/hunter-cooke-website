import type { Schema, Struct } from '@strapi/strapi';

export interface FeaturedInFeaturedIn extends Struct.ComponentSchema {
  collectionName: 'components_featured_in_featured_ins';
  info: {
    displayName: 'Featured In';
    icon: 'handHeart';
  };
  attributes: {
    title: Schema.Attribute.String;
  };
}

export interface SocialMediaSocialMedia extends Struct.ComponentSchema {
  collectionName: 'components_social_media_social_medias';
  info: {
    displayName: 'Social Media';
    icon: 'twitter';
  };
  attributes: {
    platform: Schema.Attribute.String & Schema.Attribute.Unique;
    url: Schema.Attribute.String & Schema.Attribute.Unique;
  };
}

export interface SpecializationAreasOfExpertise extends Struct.ComponentSchema {
  collectionName: 'components_specialization_areas_of_expertises';
  info: {
    displayName: 'Areas of Expertise';
    icon: 'briefcase';
  };
  attributes: {
    title: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'featured-in.featured-in': FeaturedInFeaturedIn;
      'social-media.social-media': SocialMediaSocialMedia;
      'specialization.areas-of-expertise': SpecializationAreasOfExpertise;
    }
  }
}
