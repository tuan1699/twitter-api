import { NextFunction, Request, Response } from 'express'
import path from 'path'
import { UPLOAD_IMAGE_DIR, UPLOAD_VIDEO_DIR } from '~/constants/dir'
import { USERS_MESSAGES } from '~/constants/messages'
import mediasService from '~/services/medias.services'
import mime from 'mime'
import HTTP_STATUS from '~/constants/httpStatus'
import fs from 'fs'

export const uploadImageController = async (req: Request, res: Response) => {
  const url = await mediasService.uploadImage(req)
  return res.json({
    message: USERS_MESSAGES.UPLOAD_SUCCESS,
    result: url
  })
}

export const serveImageController = (req: Request, res: Response) => {
  const { name } = req.params
  const filePath = path.resolve(UPLOAD_IMAGE_DIR, name)

  return res.sendFile(filePath, (err) => {
    if (err) {
      res.status((err as any).status).send('Not found')
    }
  })
}

export const uploadVideoController = async (req: Request, res: Response) => {
  const url = await mediasService.uploadVideo(req)
  return res.json({
    message: USERS_MESSAGES.UPLOAD_SUCCESS,
    result: url
  })
}

export const serveVideoController = (req: Request, res: Response, next: NextFunction) => {
  /**
   * Does not work
   */
  const { name } = req.params
  const filePath = path.resolve(UPLOAD_VIDEO_DIR, name)
  return res.sendFile(filePath, (err) => {
    if (err) {
      res.status((err as any).status).send('Not found')
    }
  })
  /**
   * Work normally
   */
  // const { name } = req.params
  // const filePath = path.resolve(UPLOAD_VIDEO_DIR, name)
  // fs.access(filePath, fs.constants.F_OK, (err) => {
  //   if (err) {
  //     return res.status(404).send('File not found')
  //   }
  //   res.sendFile(filePath, (sendErr) => {
  //     if (sendErr && !res.headersSent) {
  //       return res.status(500).send('Error sending file')
  //     }
  //   })
  // })
}

export const serveVideoStreamController = (req: Request, res: Response, next: NextFunction) => {
  // Get the Range header from the request
  const range = req.headers.range

  // If no Range header is provided, return HTTP 400 Bad Request
  if (!range) {
    return res.status(HTTP_STATUS.BAD_REQUEST).send('Requires Range header')
  }
  const { name } = req.params

  // Resolve the full path of the requested video file
  const videoPath = path.resolve(UPLOAD_VIDEO_DIR, name)

  // Note:
  // 1MB = 10^6 bytes (decimal system, commonly shown on UI)
  // 1MB = 2^20 bytes (1024 * 1024, binary system, used in computing)

  // Get the total size of the video file in bytes
  const videoSize = fs.statSync(videoPath).size

  // Define the chunk size for each video stream segment (3MB)
  const chunkSize = 3 * 10 ** 6 // 3,000,000 bytes = 3MB

  // Extract the start byte from the Range header (e.g., "bytes=1048576-")
  const start = Number(range.replace(/\D/g, ''))

  // Calculate the end byte for the chunk,
  // ensuring it does not exceed the video size minus 1
  const end = Math.min(start + chunkSize, videoSize - 1)

  // Calculate the content length of the chunk being sent
  // Usually equals chunkSize except for the last chunk
  const contentLength = end - start + 1

  // Get the MIME type of the video file, fallback to generic video type
  const contentType = mime.getType(videoPath) || 'video/*'

  /**
   * Content-Range header format: bytes <start>-<end>/<total size>
   * Example: Content-Range: bytes 1048576-3145727/3145728
   * Important: 'end' must always be less than the total video size
   * Incorrect: 'Content-Range': 'bytes 0-100/100'
   * Correct:   'Content-Range': 'bytes 0-99/100'
   *
   * Content-Length is calculated as end - start + 1, representing the size of this chunk.
   * For example, if start = 0 and end = 10, then content length = 11 bytes.
   *
   * Example with chunkSize = 50, videoSize = 100:
   * |0----------------50|51----------------99|100 (end)
   * Stream 1: start = 0, end = 50, contentLength = 51 bytes
   * Stream 2: start = 51, end = 99, contentLength = 49 bytes
   */

  // Prepare response headers for partial content delivery
  const headers = {
    'Content-Range': `bytes ${start}-${end}/${videoSize}`,
    'Accept-Ranges': 'bytes',
    'Content-Length': contentLength,
    'Content-Type': contentType
  }

  // Write the headers with HTTP status 206 Partial Content
  res.writeHead(HTTP_STATUS.PARTIAL_CONTENT, headers)

  // Create a readable stream for the requested video chunk and pipe it to response
  const videoStream = fs.createReadStream(videoPath, { start, end })
  videoStream.pipe(res)
}
