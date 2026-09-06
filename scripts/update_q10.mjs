import fs from 'fs';
import path from 'path';

const solPath = path.resolve('src/data/solutionsData.js');
const solModule = await import('../src/data/solutionsData.js');
const sol = solModule.DETAILED_SOLUTIONS;

sol['10'].code.python = `class Codec:
    def encode(self, strs: list[str]) -> str:
        res = ""
        for s in strs:
            res += f"{len(s)}#{s}"
        return res

    def decode(self, s: str) -> list[str]:
        res = []
        i = 0
        while i < len(s):
            j = i
            while s[j] != '#':
                j += 1
            length = int(s[i:j])
            res.append(s[j + 1 : j + 1 + length])
            i = j + 1 + length
        return res

class Solution:
    def encodeAndDecode(self, strs: list[str]) -> list[str]:
        codec = Codec()
        return codec.decode(codec.encode(strs))
    encode_and_decode = encodeAndDecode`;

fs.writeFileSync(solPath, `// Curated Detailed Solutions & Editorials for Problems 1 to 60\nexport const DETAILED_SOLUTIONS = ${JSON.stringify(sol, null, 2)};\n`, 'utf-8');
console.log('Updated Q10 in solutionsData.js');
