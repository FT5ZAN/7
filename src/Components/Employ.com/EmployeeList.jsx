import styled from "styled-components";
import { useNavigate } from "react-router-dom";

function EmployeeList({ employees, onEdit, onDelete }) {
  const navigate = useNavigate();

  return (
    <ListWrapper>
      {employees.map((emp) => (
        <Row key={emp.id}>
          <Left>
            <Avatar>{emp.name.charAt(0).toUpperCase()}</Avatar>

            <NameBlock>
              <Name>{emp.name}</Name>
              <Status $status={emp.status}>{emp.status}</Status>
            </NameBlock>
          </Left>

          <Actions>
            <ViewBtn onClick={() => navigate(`/Employees/${emp.id}`)}>
              View
            </ViewBtn>

            <EditBtn onClick={() => onEdit(emp)}>Edit</EditBtn>

            <DeleteBtn onClick={() => onDelete(emp)}>Delete</DeleteBtn>
          </Actions>
        </Row>
      ))}
    </ListWrapper>
  );
}

export default EmployeeList;

const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Row = styled.div`
  background: #0b142d;
  padding: 14px 18px;
  border-radius: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

const Avatar = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #0371ea;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: 600;
  font-size: 18px;
`;

const NameBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Name = styled.span`
  color: #fff;
  font-weight: 500;
`;

// const Status = styled.span`
//   font-size: 12px;
//   width: fit-content;
//   padding: 2px 8px;
//   border-radius: 12px;
//   color: ${({ status }) =>
//     status === "active" ? "#16a34a" : "#dc2626"};
//   background: ${({ status }) =>
//     status === "active" ? "#dcfce7" : "#fee2e2"};
// `;

const Status = styled.span`
  font-size: 12px;
  width: fit-content;
  padding: 2px 8px;
  border-radius: 12px;
  color: ${({ $status }) => ($status === "active" ? "#16a34a" : "#dc2626")};
  background: ${({ $status }) =>
    $status === "active" ? "#dcfce7" : "#fee2e2"};
`;

const Actions = styled.div`
  display: flex;
  gap: 10px;
`;

const ViewBtn = styled.button`
  background: transparent;
  border: 1px solid #0371ea;
  color: #0371ea;
  padding: 6px 12px;
  border-radius: 8px;
  cursor: pointer;
`;

const EditBtn = styled.button`
  background: #0371ea;
  border: none;
  color: white;
  padding: 6px 12px;
  border-radius: 8px;
  cursor: pointer;
`;

const DeleteBtn = styled.button`
  background: #dc2626;
  border: none;
  color: white;
  padding: 6px 12px;
  border-radius: 8px;
  cursor: pointer;
`;

