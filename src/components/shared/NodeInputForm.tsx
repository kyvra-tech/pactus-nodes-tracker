// import React, { useState } from "react";
// import FormInputField from "./FormInputField";

// interface NodeFormProps {
//   onSubmit: (data: { name: string; ip: string; port: string }) => void;
// }

// const NodeInputForm: React.FC<NodeFormProps> = ({ onSubmit }) => {
//   const [name, setName] = useState("");
//   const [ip, setIp] = useState("");
//   const [port, setPort] = useState("");

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     onSubmit({ name, ip, port });
//     setName("");
//     setIp("");
//     setPort("");
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="w-full max-w-7xl dark:bg-gray-800 p-5 rounded-lg border border-gray-300 dark:border-gray-700 shadow-sm"
//     >
//       <div className="grid grid-cols-[1fr_1fr_1fr_auto] gap-4 items-end">
//         <FormInputField
//           label="Node Name"
//           id="node-name"
//           name="node-name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />
//         <FormInputField
//           label="IP Address"
//           id="ip-address"
//           name="ip-address"
//           value={ip}
//           onChange={(e) => setIp(e.target.value)}
//         />
//         <FormInputField
//           label="Port"
//           id="port"
//           name="port"
//           value={port}
//           onChange={(e) => setPort(e.target.value)}
//         />
//         <button
//           type="submit"
//           className="bg-gray-700 text-white px-5 py-2 h-12 rounded-md text-sm font-medium hover:bg-gray-900 transition w-24 self-end"
//         >
//           Submit
//         </button>
//       </div>
//     </form>
//   );
// };

// export default NodeInputForm;
