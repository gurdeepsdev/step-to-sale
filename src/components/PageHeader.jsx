export default function PageHeader({
  breadcrumb = "",
  title,
  description,
  align = "left", // left | center
}) {
  return (
    <section className="relative w-full min-h-[260px] sm:min-h-[300px] flex items-center bg-black">

      {/* Content */}
      <div
        className={`relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full ${
          align === "center" ? "text-center" : "text-left"
        }`}>
        {breadcrumb && (
          <p className="text-sm text-gray-300 mb-3">{breadcrumb}</p>
        )}

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
          {title}
        </h1>

        {description && (
          <p className="mt-4 max-w-2xl text-gray-300 text-base sm:text-lg">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
