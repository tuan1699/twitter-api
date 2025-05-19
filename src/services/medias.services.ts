import path from 'path'
import sharp from 'sharp'
import fs from 'fs'
import { UPLOAD_DIR, UPLOAD_IMAGE_DIR } from '~/constants/dir'
import { Media } from '~/models/Other'
import { getNameFromFullname, handleUploadImage } from '~/utils/file'
import { MediaType } from '~/constants/enums'
import { isProduction } from '~/constants/config'
import { Request } from 'express'

class MediasService {
  async uploadImage(req: Request) {
    const files = await handleUploadImage(req)
    const result: Media[] = await Promise.all(
      files.map(async (file) => {
        const newName = getNameFromFullname(file.newFilename)
        const newFullFilename = `${newName}.jpg`
        const newPath = path.resolve(UPLOAD_DIR, newFullFilename)
        await sharp(file.filepath).jpeg().toFile(newPath)

        fs.unlinkSync(file.filepath)
        return {
          url: isProduction
            ? `${process.env.HOST}/static/image/${newFullFilename}`
            : `http://localhost:${process.env.PORT}/static/image/${newFullFilename}`,
          type: MediaType.Image
        }

        // const s3Result = await uploadFileToS3({
        //   filename: 'images/' + newFullFilename,
        //   filepath: newPath,
        //   contentType: mime.getType(newPath) as string
        // })
        // await Promise.all([fsPromise.unlink(file.filepath), fsPromise.unlink(newPath)])
        // return {
        //   url: (s3Result as CompleteMultipartUploadCommandOutput).Location as string,
        //   type: MediaType.Image
        // }

        // ----- NOT USE S3 -----
        // return {
        //   url: isProduction
        //     ? `${process.env.HOST}/static/image/${newFullFilename}`
        //     : `http://localhost:${process.env.PORT}/static/image/${newFullFilename}`,
        //   type: MediaType.Image
        // }
      })
    )
    return result
  }
}

const mediasService = new MediasService()

export default mediasService
