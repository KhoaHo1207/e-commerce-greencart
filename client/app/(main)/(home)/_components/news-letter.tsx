export default function NewsLetter() {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-2 mt-24">
      <h1 className="md:text-4xl text-2xl font-semibold text-foreground">
        Never Miss a Deal!
      </h1>
      <p className="md:text-lg text-muted-foreground pb-8">
        Subscribe to get the latest offers, new arrivals, and exclusive
        discounts
      </p>
      <form className="flex items-center justify-between max-w-2xl w-full md:h-13 h-12">
        <input
          className="border border-border bg-background text-foreground placeholder:text-muted-foreground rounded-md h-full border-r-0 outline-none w-full rounded-r-none px-3"
          type="text"
          placeholder="Enter your email id"
          required
        />
        <button
          type="submit"
          className="md:px-12 px-8 h-full text-primary-foreground bg-primary hover:bg-primary/90 transition-all cursor-pointer rounded-md rounded-l-none"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
}
