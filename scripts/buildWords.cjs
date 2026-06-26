const fs = require('fs')
const path = require('path')

const rootDir = path.resolve(__dirname, '..')
const packsDir = path.join(rootDir, 'word-packs')
const publicWordsPath = path.join(rootDir, 'public', 'data', 'words.json')
const docsWordsPath = path.join(rootDir, 'docs', 'data', 'words.json')

function normalizeText(value) {
  return String(value || '')
    .replace(/[^A-Za-z0-9]/g, '')
    .toUpperCase()
}

function normalizeDefinition(value) {
  return String(value || '').trim()
}

function normalizeEntry(entry) {
  const normalized = {
    word: normalizeText(entry.word),
    category: normalizeText(entry.category),
    difficulty: normalizeText(entry.difficulty)
  }

  const definition = normalizeDefinition(entry.definition)

  if (definition) {
    normalized.definition = definition
  }

  return normalized
}

function getEntryKey(entry) {
  return `${entry.word}|${entry.category}|${entry.difficulty}`
}

function readWordPacks() {
  if (!fs.existsSync(packsDir)) {
    throw new Error(`Missing word-packs folder: ${packsDir}`)
  }

  const packFiles = fs
    .readdirSync(packsDir)
    .filter(fileName => fileName.endsWith('.json'))
    .sort((a, b) => a.localeCompare(b))

  if (!packFiles.length) {
    throw new Error('No JSON files found in word-packs.')
  }

  return packFiles.flatMap(fileName => {
    const filePath = path.join(packsDir, fileName)
    const parsed = JSON.parse(fs.readFileSync(filePath, 'utf8'))

    if (!Array.isArray(parsed)) {
      throw new Error(`${fileName} must contain a JSON array.`)
    }

    return parsed
  })
}

function buildWords() {
  const rawEntries = readWordPacks()
  const uniqueEntries = new Map()

  for (const rawEntry of rawEntries) {
    const entry = normalizeEntry(rawEntry)

    if (!entry.word || !entry.category || !entry.difficulty) {
      continue
    }

    const key = getEntryKey(entry)

    if (!uniqueEntries.has(key)) {
      uniqueEntries.set(key, entry)
    }
  }

  const sortedEntries = [...uniqueEntries.values()].sort((a, b) => {
    const wordCompare = a.word.localeCompare(b.word)

    if (wordCompare !== 0) {
      return wordCompare
    }

    const categoryCompare = a.category.localeCompare(b.category)

    if (categoryCompare !== 0) {
      return categoryCompare
    }

    return a.difficulty.localeCompare(b.difficulty)
  })

  fs.mkdirSync(path.dirname(publicWordsPath), { recursive: true })
  fs.writeFileSync(publicWordsPath, `${JSON.stringify(sortedEntries, null, 2)}\n`)

  if (fs.existsSync(path.dirname(docsWordsPath))) {
    fs.writeFileSync(docsWordsPath, `${JSON.stringify(sortedEntries, null, 2)}\n`)
  }

  console.log(`Built ${sortedEntries.length} words from ${packsDir}`)
}

buildWords()
