export const Stats = () => {
  const stats = [
    { number: "500+", label: "Campaigns Managed" },
    { number: "50+", label: "Agency Partners" },
    { number: "2.5x", label: "Average ROI Increase" },
    { number: "24/7", label: "Support Available" }
  ];

  return (
    <section className="py-16 bg-gradient-primary relative overflow-hidden">
      <div className="absolute inset-0 bg-black/10" />
      <div className="container px-4 mx-auto relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
          {stats.map((stat, index) => (
            <div key={index} className="space-y-2">
              <div className="text-4xl md:text-5xl font-bold">{stat.number}</div>
              <div className="text-primary-foreground/80 text-sm md:text-base">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};