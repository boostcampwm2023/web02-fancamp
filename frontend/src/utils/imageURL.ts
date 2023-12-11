type ImageType =
  | 'banner-small'
  | 'banner-medium'
  | 'post-large'
  | 'post-medium'
  | 'profile-small'
  | 'profile-medium';

const IMAGE_SIZES = {
  'banner-small': [320, 240],
  'banner-medium': [1400, 500],
  'post-medium': [320, 320],
  'post-large': [1200, 1000],
  'profile-small': [80, 80],
  'profile-medium': [200, 200],
};

const IMAGE_OPTIMIZER_URL = 'https://ocju9rrf1834.edge.naverncp.com/tlPgesmTAV';

export function optimizedImageURL(urlString: string, type: ImageType): string {
  if (!urlString) {
    return '';
  }
  if (!type) {
    return urlString;
  }

  const url = new URL(urlString);
  const newHostname = IMAGE_OPTIMIZER_URL;
  const pathName = url.pathname.replace('/fancamp-images/', '/');

  const [width, height] = IMAGE_SIZES[type];
  const searchPath = `?type=f&w=${width}&h=${height}`;
  const newURL = new URL(newHostname + pathName + searchPath);
  return newURL.toString();
}
