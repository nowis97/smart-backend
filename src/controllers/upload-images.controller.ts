// Uncomment these imports to begin using these cool features!




import { post, requestBody} from '@loopback/rest';
export class UploadImagesController {
    constructor() {
  }
@post('/upload-image', {
  responses: {
    200: {
      content: {
        'application/json': {
        },
      },
      description: '',
    },
  },
})
async uploadImage(
    @requestBody({
      description: 'multipart/form-data value.',
      required: true,
      content: {
        'multipart/form-data':{
            schema: {type: 'object'}
        }
      },
    })
        body:unknown
) {
      return body;
}


}