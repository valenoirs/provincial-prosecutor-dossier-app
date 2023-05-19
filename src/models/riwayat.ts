import { model, Schema } from 'mongoose'
import { IRiwayat } from '../interface/riwayat'

const RiwayatSchema: Schema = new Schema<IRiwayat>(
  {
    peminjamNama: { type: String, required: true },
    peminjamNip: { type: String, required: true },
    waktuRequest: { type: Date, required: true, default: Date.now() },
    waktuRespond: { type: Date },
    waktuDownload: { type: Date },
    isResponded: { type: Boolean, required: true, default: false },
    isAccepted: { type: Boolean, required: true, default: false },
    isDownloaded: { type: Boolean, required: true, default: false },
    isCompleted: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  }
)

export const Riwayat = model<IRiwayat>('Riwayat', RiwayatSchema)
