import { fileUpload } from '../../src/helpers/fileUpload';
import { v2 as cloudinary } from 'cloudinary';
import { CloudDinaryConfig } from '../../keys/cloudinary.config';

// set cloudinary sdk
cloudinary.config(CloudDinaryConfig);

describe('Tests on fileUpload', () => {
  test('should upload the file correctly to cloudinary', async () => {
    const imageUrl =
      'https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png';
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const file = new File([blob], 'photo.png');

    const url = await fileUpload(file);
    expect(typeof url).toBe('string');
    // Delete image from cloudinary process
    // Url structure
    //  https://res.cloudinary.com/dnfs4zxek/image/upload/v1674792239/journal/sfi46nm9ccwlmkfb75qe.png
    const segments = url.split('/');
    const imageId = segments[segments.length - 1].replace('.png', '');
    await cloudinary.api.delete_resources([`journal/${imageId}`], {
      resource_type: 'image',
    });
  });

  test('should return null if the file is empty', async () => {
    const file = new File([], 'foto.jpg');
    const url = await fileUpload(file);
    expect(url).toBe(null);
  });
});
