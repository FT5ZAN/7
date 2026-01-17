import styled from "styled-components";

function EmployeeFilters({ filters, onChange, onClear, roles, departments }) {
  return (
    <Wrapper>
      <Input
        type="text"
        placeholder="Search by name"
        value={filters.search}
        onChange={(e) => onChange("search", e.target.value)}
      />

      <Select
        value={filters.role}
        onChange={(e) => onChange("role", e.target.value)}
      >
        <option value="">All Roles</option>
        {roles.map((role) => (
          <option key={role} value={role}>
            {role}
          </option>
        ))}
      </Select>

      <Select
        value={filters.department}
        onChange={(e) => onChange("department", e.target.value)}
      >
        <option value="">All Departments</option>
        {departments.map((dep) => (
          <option key={dep} value={dep}>
            {dep}
          </option>
        ))}
      </Select>

      <Select
        value={filters.status}
        onChange={(e) => onChange("status", e.target.value)}
      >
        <option value="">All Status</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </Select>
      <ClearBtn onClick={onClear}>Clear Filters</ClearBtn>
    </Wrapper>
  );
}

export default EmployeeFilters;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 12px;
  margin-bottom: 20px;
`;

const Input = styled.input`
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid #1f2a55;
  background: #0b142d;
  color: #fff;
`;

const Select = styled.select`
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid #1f2a55;
  background: #0b142d;
  color: #fff;
`;

const ClearBtn = styled.button`
  background: transparent;
  border: 1px solid #dc2626;
  color: #dc2626;
  padding: 10px 12px;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background: #dc2626;
    color: white;
  }
`;
