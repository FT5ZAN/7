function ProjectFilters({ filters, onChange, onClear, statuses }) {
  return (
    <div className="projectFilters">
      <input
        type="text"
        placeholder="Search project name"
        value={filters.search}
        onChange={(e) => onChange("search", e.target.value)}
      />

      <select
        value={filters.status}
        onChange={(e) => onChange("status", e.target.value)}
      >
        <option value="">All Status</option>
        {statuses.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>

      <button onClick={onClear}>Clear</button>
    </div>
  );
}

export default ProjectFilters;
