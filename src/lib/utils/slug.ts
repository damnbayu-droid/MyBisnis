
import { nanoid } from 'nanoid'

export function generateSlug(name: string, isVerified: boolean = false): string {
    if (!name) return nanoid(10)

    // Normalize name: remove special chars, spaces to underscores/hyphens
    const cleanName = name
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, '') // remove non-alphanumeric except space and hyphen
        .replace(/\s+/g, '_')         // replace spaces with underscores

    if (isVerified) {
        return cleanName
    } else {
        // Unverified: Use short ID
        // User requested: //mybisnis.app/ba82de01ksq (looks like ~10-12 chars random)
        return nanoid(12)
    }
}

export function generateSmartSlug(name: string, existingSlugs: string[]) {
    // Logic to handle duplicates: Caffe_Town -> Caffe_Town2 -> Caffe_Town3
    // This requires DB access usually, so might be better in the Service/API layer.
    // This utility can just format strings.
}
