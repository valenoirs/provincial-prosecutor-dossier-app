export interface IRiwayat {
  id?: any
  peminjamNama: string
  peminjamNip: string
  waktuRequest: Date
  waktuRespond: Date
  waktuDownload: Date
  isResponded: boolean
  isAccepted: boolean
  isDownloaded: boolean
  isCompleted: boolean
  createdAt?: Date
  updatedAt?: Date
}
