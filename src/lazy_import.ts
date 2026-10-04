import { lazy } from "react"
import isMobile from "./utils/is_mobile"

const modules = import.meta.glob("../**/index.tsx")

type ImportPath = `./${string}`

const DELAY_MS = isMobile() ? 1000 : 0;

const delay = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms))

export default function lazyImport(
    path: ImportPath,
    namedExport?: string
) {
    return lazy(async () => {
        const loader = modules[`${path}/index.tsx`]

        if (!loader) {
            throw new Error(`Module not found: ${path}/index.tsx`)
        }

        // Wait 1s BEFORE firing the network request for the chunk
        await delay(DELAY_MS)

        const module = await loader()

        if (namedExport == null) {
            return module as { default: React.ComponentType }
        }

        return {
            default: (module as Record<string, React.ComponentType>)[namedExport]
        }
    })
}