export default function NewsLetter() {
  return (
    <section
      id="newsletter"
      className="flex flex-col items-center justify-center text-center space-y-2 mt-24"
      aria-labelledby="newsletter-heading"
    >
      <h2
        id="newsletter-heading"
        className="md:text-4xl text-2xl font-semibold text-foreground"
      >
        Never Miss a Deal!
      </h2>
      <p className="md:text-lg text-muted-foreground pb-8">
        Subscribe to get the latest offers, new arrivals, and exclusive
        discounts
      </p>
      <form className="flex items-center justify-between max-w-2xl w-full md:h-13 h-12">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          name="email"
          className="border border-border bg-background text-foreground placeholder:text-muted-foreground rounded-md h-full border-r-0 outline-none w-full rounded-r-none px-3"
          type="email"
          autoComplete="email"
          placeholder="Enter your email"
          required
        />
        <button
          type="submit"
          className="md:px-12 px-8 h-full text-primary-foreground bg-primary hover:bg-primary/90 transition-all cursor-pointer rounded-md rounded-l-none"
        >
          Subscribe
        </button>
      </form>
    </section>
  );
}
