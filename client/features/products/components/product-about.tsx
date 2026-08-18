export default function ProductAbout({
  description,
}: {
  description: string[];
}) {
  if (description.length === 0) return null;

  return (
    <section className="mt-16" aria-labelledby="about-product-heading">
      <div className="flex flex-col items-end w-max">
        <h2 id="about-product-heading" className="text-2xl font-medium uppercase">
          About Product
        </h2>
        <div className="w-16 h-0.5 bg-primary rounded-full" />
      </div>

      <ul className="list-disc ml-4 mt-6 text-muted-foreground">
        {description.map((desc) => (
          <li key={desc}>{desc}</li>
        ))}
      </ul>
    </section>
  );
}
