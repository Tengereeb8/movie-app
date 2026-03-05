type NameProps = {
  name: string;
  rate: number;
};

const NameReviewStatus = ({ name, rate }: NameProps) => {
  return (
    <div className="w-full flex justify-between lg:flex-col">
      <div className="flex flex-col md:gap-2">
        <p className="font-normal text-sm leading-5 text-[#09090B] md:text-[16px] lg:text-white lg:text-[16px  dark:text-[#fafafa]">
          Now Playing:
        </p>
        <h3 className="font-semibold text-[24px] leading-8 tracking-[-2.5%] md:text-4xl lg:text-white lg:text-[36px]  dark:text-[#fafafa]">
          {name}
        </h3>
      </div>
      <div className="w-20.75 h-12 flex gap-1 items-center">
        <img
          className="h-7 w-7 object-cover"
          src="/HeroCarousel/Vector.svg"
          alt="Star review"
        />
        <p className="text-[18px] font-semibold leading-7 text-[#09090B] lg:text-white dark:text-[#fafafa]">
          {rate.toFixed(1)}
          <span className="font-normal text-[16px] leading-6 text-[#71717A] lg:text-white">
            /10
          </span>
        </p>
      </div>
    </div>
  );
};

export default NameReviewStatus;
