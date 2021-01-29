import React, { FC, useEffect } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { Card, Col, Container, Row } from 'react-bootstrap';
import Ruler from './Ruler';
import '../../styles/schedule.scss';
import { shiftList } from '../../actions/shift';

const Schedule: FC = () => {
  const { shifts } = useSelector((state: RootStateOrAny) => state.shift);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(shiftList());
  },[]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {}, [shifts]);

  return (
    <Container className="list">
      <Row className="header">
        <Col lg={6} sm={12}>
          <h4>Shifts</h4>
        </Col>
      </Row>
      <Card className="schedule">
        <Ruler shifts={shifts} />
      </Card>
    </Container>
  );
};

export default Schedule;
