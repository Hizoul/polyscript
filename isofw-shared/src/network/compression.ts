import val from "isofw-shared/src/globals/val"
import lzString from "isofw-shared/src/util/lzString"
import pako from "isofw-shared/src/util/pako"

/**
 * https://gist.github.com/fliptopbox/6990878
 * @param msg
 * @param asArray
 */
const compress = (msg: any, asArray?: boolean) => {
	// Build the dictionary.
	asArray = (asArray === true)
	let i,
		dictionary: any = {},
		uncompressed = msg,
		c,
		wc,
		w = "",
		result: any[] = [],
		ASCII = "",
		dictSize = 256
	for (i = 0; i < 256; i += 1) {
		dictionary[String.fromCharCode(i)] = i
	}

	for (i = 0; i < uncompressed.length; i += 1) {
		c = uncompressed.charAt(i)
		wc = w + c
		// Do not use dictionary[wc] because javascript arrays
		// will return values for array['pop'], array['push'] etc
	   // if (dictionary[wc]) {
		if (dictionary.hasOwnProperty(wc)) {
			w = wc
		} else {
			result.push(dictionary[w])
			ASCII += String.fromCharCode(dictionary[w])
			// Add wc to the dictionary.
			dictionary[wc] = dictSize++
			w = String(c)
		}
	}

	// Output the code for w.
	if (w !== "") {
		result.push(dictionary[w])
		ASCII += String.fromCharCode(dictionary[w])
	}
	return asArray ? result : ASCII
}

const decompress = (msg: any) => {
	// Build the dictionary.
	let i, tmp: any = [],
		dictionary: any[] = [],
		compressed = msg,
		w,
		result: any,
		k,
		entry = "",
		dictSize = 256
	for (i = 0; i < 256; i += 1) {
		dictionary[i] = String.fromCharCode(i)
	}

	if (compressed && typeof compressed === "string") {
		// convert string into Array.
		for (i = 0; i < compressed.length; i += 1) {
			tmp.push(compressed[i].charCodeAt(0))
		}
		compressed = tmp
		tmp = null
	}

	w = String.fromCharCode(compressed[0])
	result = w
	for (i = 1; i < compressed.length; i += 1) {
		k = compressed[i]
		if (dictionary[k]) {
			entry = dictionary[k]
		} else {
			if (k === dictSize) {
				entry = w + w.charAt(0)
			} else {
				return null
			}
		}

		result += entry

		// Add w+entry[0] to the dictionary.
		dictionary[dictSize++] = w + entry.charAt(0)

		w = entry
	}
	return result
}

const packMessage = (msg: any) => {
  let toSend = msg
  if (val.network.useCompression) {
    if (val.network.useGzipCompression) {
      // toSend = pako.gzip(toSend, {to: "string"})
      toSend = compress(toSend)
    } else {
      toSend = lzString.compressToBase64(toSend)
    }
  }
  return toSend
}

const unpackMessage = (msg: any) => {
  let uncompressedMessage = msg
  if (val.network.useCompression) {
    if (val.network.useGzipCompression) {
      uncompressedMessage = decompress(msg)
      // uncompressedMessage = pako.ungzip(msg, {to: "string"})
      // console.log("UNZIPPED IS", uncompressedMessage)
    } else {
      uncompressedMessage = lzString.decompressFromBase64(msg)
    }
  }
  return uncompressedMessage
}

export {
  packMessage, unpackMessage
}
