// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/context';



import {post, requestBody, RestBindings} from "@loopback/rest";
import {inject} from "@loopback/context";

export class UploadImagesController {
    constructor() {
        console.debug('constructor de UploadImageController');
  }
@post('/show-body', {
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
async showBody(
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