export default function InternetShaper() {
    return (
        <div className="flex items-center justify-center h-screen p-4">
            <iframe
                src="/thesis-slides.pdf"
                title="Thesis slides"
                className="w-full max-w-[1000px] h-[85vh] border-0"
            />
        </div>
    )
}
