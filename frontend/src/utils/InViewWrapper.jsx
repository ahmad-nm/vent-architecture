import useInViewTrigger from "@/hooks/useInViewTrigger"

export default function InViewWrapper({ children }) {
    const [ref, isInView] = useInViewTrigger({ once: true })

    return (
        <div ref={ref}>
            {children(isInView)}
        </div>
    )
}