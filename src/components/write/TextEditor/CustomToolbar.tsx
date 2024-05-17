export default function CustomToolbar() {
  return (
    <div id="toolbar">
      <button className="ql-header" value="1"></button>
      <button className="ql-header" value="2"></button>
      <button className="ql-bold"></button>
      <button className="ql-italic"></button>
      <button className="ql-list" value="ordered"></button>
      <button className="ql-list" value="bullet"></button>
      <select className="ql-color"></select>
      <select className="ql-background"></select>
      <button className="ql-image"></button>
    </div>
  );
}
