/* eslint-disable
  react/jsx-props-no-spreading,
  no-underscore-dangle
*/
import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import CustomDatePicker from '../common/CustomDatePicker';
import { deleteShiftEntry, shiftList } from '../../actions/shift';
import CustomButton from '../common/CustomButton';
import CustomModal from '../common/CustomModal';
import ShiftForm from './ShiftForm';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import '../../styles/list.scss';

const newShift = {
  id: null,
  name: '',
  date: '',
  startTime: '00:00',
  endTime: '23:59',
};

const ShiftsList = () => {
  const { shifts } = useSelector((state: RootStateOrAny) => state.shift);
  const [isOpen, toggleOpen] = useState(false);
  const [mode, setMode] = useState('');
  const [currData, setCurrData] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(shifts);
  }, [shifts, currData, mode]);

  const toggleModal = () => {
    toggleOpen(!isOpen);
  };

  async function getAList() {
    await dispatch(shiftList());
  }

  useEffect(() => {
    getAList();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function confirmDelete(e: any) {
    if (window.confirm('Are you sure you wish to delete this item?')) {
      // eslint-disable-line no-alert
      const results: any = await dispatch(deleteShiftEntry(e.target.id));

      if (results.action.payload.data.response === 'success') {
        getAList();
      }
    }
  }

  const triggerAction = (action: any, data: any) => {
    toggleModal();
    setMode(action);
    setCurrData({ ...{}, ...data });
  };

  const displayAList = () => {
    if (Object.keys(shifts).length > 0) {
      const row = shifts.map((item: any) => (
        <Tr key={item.name}>
          <Td>{item.name}</Td>
          <Td>{item.date}</Td>
          <Td>{item.startTime}</Td>
          <Td>{item.endTime}</Td>
          <Td>
            <CustomButton
              id={item._id}
              label="Edit"
              variant="warning"
              size="sm"
              onClick={() => triggerAction('edit', item)}
            />
            &nbsp;
            <CustomButton
              id={item._id}
              label="Delete"
              variant="danger"
              size="sm"
              onClick={confirmDelete}
            />
          </Td>
        </Tr>
      ));

      return (
        <Table>
          <Thead>
            <Tr>
              <Th scope="col">Name</Th>
              <Th scope="col">Date</Th>
              <Th scope="col">Start Time</Th>
              <Th scope="col">End Time</Th>
              <Th scope="col">Action</Th>
            </Tr>
          </Thead>
          <Tbody>{row}</Tbody>
        </Table>
      );
    }
    return (
      <p>
        <em>There are no shifts at the moment.</em>
      </p>
    );
  };

  return (
    <Container className="list">
      <Row className="justify-content-md-center">
        <Col xs md="12" lg="12">
          <Row className="header">
            <Col lg={6} sm={12}>
              <h4>Shifts</h4>
            </Col>
            <Col className="add-button" lg={6} sm={12}>
              <CustomButton
                label="Add Shift"
                variant="info"
                onClick={() => triggerAction('add', newShift)}
              />
              <CustomModal
                handleClose={toggleModal}
                show={isOpen}
                size="lg"
                modalHeading={`${mode === 'add' ? 'Add New' : 'Edit'} Shift`}
              >
                <ShiftForm
                  row={currData}
                  mode={mode}
                  closeModal={toggleModal}
                />
              </CustomModal>
            </Col>
          </Row>
          {displayAList()}
        </Col>
      </Row>
    </Container>
  );
};

export default ShiftsList;
