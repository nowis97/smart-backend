import {BodyParser, Request, RequestBody} from "@loopback/rest";
import * as multer from 'multer';
import * as path from 'path';

export class MultipartFormDataBodyParser implements BodyParser{
    storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './uploads');
        },
        filename: function (req, file, cb) {
            cb(null, file.fieldname + '_' + Date.now()+path.extname(file.originalname));
        }
    });

    name = 'multipart/form-data';
        parse(request: Request): Promise<RequestBody> {
        //const u   pload = multer({dest:'/public'});
        //console.debug(upload);
        const upload = multer({ storage: this.storage });
        return new Promise<RequestBody>((resolve, reject) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            upload.single()(request,{} as any,err => {
                if (err) reject(err);
                else{

                    resolve({
                        value:{
                            filename:request.file.filename
                        }
                    })
                }
            })
        })

    }

    supports(mediaType: string): boolean {
        return mediaType.startsWith(this.name);
    }

}