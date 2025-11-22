import type { RichTextContent } from '@graphcms/rich-text-types';

declare namespace PageInfo {
  export type Home = {
    introduction: {
      raw: RichTextContent;
    };
    technologies: {
      name: string;
    }[];
    profilePicture: {
      url: string;
    };
  };
}
