import CryptoJS from "crypto-js";

interface Props {
  name: string;
  className?: string;
}

const Identicon: React.FC<Props> = ({ name, className }) => {
  // FUNCTION TO GENERATE THE SVG BASED ON THE NAME
  const generateIdenticonSVG = (text: string) => {
    const hash = CryptoJS.MD5(text).toString();
    let svgElements = "";

    // GENERATE A 5X5 GRID BASED ON THE HASH VALUES
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        if (parseInt(hash[i * 5 + j], 16) % 2 === 0) {
          const color = `hsl(${parseInt(hash.slice(0, 2), 16)}, 63%, 30%)`;
          svgElements += `<rect x="${i}" y="${j}" width="1" height="1" fill="${color}" />`;
        }
      }
    }

    return `<svg viewBox="-1.5 -1.5 8 8" xmlns="http://www.w3.org/2000/svg">${svgElements}</svg>`;
  };

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: generateIdenticonSVG(name),
      }}
      className={`rounded-full overflow-hidden ${className}`}
      style={{ width: "40px", height: "40px", display: "inline-block" }}
    />
  );
};

export default Identicon;
