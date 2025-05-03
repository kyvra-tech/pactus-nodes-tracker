interface Props {
  className?: string;
}

const Stats: React.FC<Props> = (className) => {
  return (
    <section className={`relative ${className}`}>
      <div className="mx-auto lg:mx-0 p-5 sm:p-6 py-6 sm:py-4 max-w-9xl rounded-xl bg-box-bg border border-box-border shadow-sm shadow-box-shadow md:divide-x divide-box-border grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 md:gap-6 lg:gap-12">
        <div className="text-center">
          <h2 className="font-semibold text-lg sm:text-xl md:text-3xl text-heading-2">
            99.999%
          </h2>
          <p className="mt-2 text-heading-3">Average Uptime</p>
        </div>

        <div className="text-center">
          <h2 className="font-semibold text-lg sm:text-xl md:text-3xl text-heading-2">
            0.001%
          </h2>
          <p className="mt-2 text-heading-3">Average Downtime</p>
        </div>

        <div className="text-center">
          <h2 className="font-semibold text-lg sm:text-xl md:text-3xl text-heading-2">
            50+
          </h2>
          <p className="mt-2 text-heading-3">Bootstrap Nodes</p>
        </div>

        <div className="text-center">
          <h2 className="font-semibold text-lg sm:text-xl md:text-3xl text-heading-2">
            800+
          </h2>
          <p className="mt-2 text-heading-3">Peer Nodes</p>
        </div>
      </div>
    </section>
  );
};

export default Stats;
