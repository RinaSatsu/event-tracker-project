import Image from "next/image";

function toCamelCaseId(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+(.)/g, (_, char) => char.toUpperCase());
}

export default function SearchField({ icon, label }) {
  const id = toCamelCaseId(label)
  return (
    <div className="input-container">
      <Image
        src={`/${icon}`}
        alt=""
        width={32}
        height={32}
      />
      <input type="text" id={id} required />
      <label htmlFor={id} className="label">{label}</label>
      <div className="underline"></div>
    </div>
  );
}

// styling
// .input-container {
//   position: relative;
//   margin: 50px auto;
//   width: 200px;
// }

// .input-container input[type="text"] {
//   font-size: 20px;
//   width: 100%;
//   border: none;
//   border-bottom: 2px solid #ccc;
//   padding: 5px 0;
//   background-color: transparent;
//   outline: none;
// }

// .input-container .label {
//   position: absolute;
//   top: 0;
//   left: 0;
//   color: #ccc;
//   transition: all 0.3s ease;
//   pointer-events: none;
// }

// .input-container input[type="text"]:focus ~ .label,
// .input-container input[type="text"]:valid ~ .label {
//   top: -20px;
//   font-size: 16px;
//   color: #333;
// }

// .input-container .underline {
//   position: absolute;
//   bottom: 0;
//   left: 0;
//   height: 2px;
//   width: 100%;
//   background-color: #333;
//   transform: scaleX(0);
//   transition: all 0.3s ease;
// }

// .input-container input[type="text"]:focus ~ .underline,
// .input-container input[type="text"]:valid ~ .underline {
//   transform: scaleX(1);
// }
