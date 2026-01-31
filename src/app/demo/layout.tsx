export default function DemoLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            {/* Demo Banner */}
            <div className="bg-amber-500 text-slate-900 text-center py-2 font-bold text-xs fixed top-0 left-0 right-0 z-[100] shadow-md uppercase tracking-wider">
                🚧 DEMO MODE - PRESENTATION ONLY 🚧
            </div>
            {children}
        </>
    )
}
