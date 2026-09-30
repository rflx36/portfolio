import { lazy } from "react"

const modules = import.meta.glob("../**/index.tsx")

type ImportPath = `./${string}`

export default function lazyImport(
    path: ImportPath,
    namedExport?: string
) {
    return lazy(async () => {
        const loader = modules[`${path}/index.tsx`]

        if (!loader) {
            throw new Error(`Module not found: ${path}/index.tsx`)
        }

        const module = await loader()

        if (namedExport == null) {
            return module as { default: React.ComponentType }
        }

        return {
            default: (module as Record<string, React.ComponentType>)[namedExport]
        }
    })
}