import { useInView } from "framer-motion"
import { useRef } from "react"

export default function useInViewTrigger(options = {}) {
    const ref = useRef(null)
    const isInView = useInView(ref, {
        once: true,
        margin: "-20% 0px",
        ...options,
    })

    return [ref, isInView]
}