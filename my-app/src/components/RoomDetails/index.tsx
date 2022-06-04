import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import moment from 'moment';
import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { IRoom } from '../../models';
import { IReduxState } from '../../redux/store';
import { AddReservationModal } from './AddReservationModal';

const RoomDeatils: React.FC = () => {
    const { roomId } = useParams<{ roomId: string }>();
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const rooms = useSelector<IReduxState, IRoom[]>(state => state.rooms)
    const reservedRoom = rooms.find((room) => room.id === Number(roomId));

    const handleAddReservationClick = () => {
        setIsModalOpen(true);
    }

    return (
        <Box p="24px" >
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <h1>Reservetion of room #{roomId}</h1>
                <Button variant="contained" color="primary" onClick={handleAddReservationClick}>
                    Add new reservation
                </Button>
            </Box>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><b>#</b></TableCell>
                            <TableCell><b>Reserved By</b></TableCell>
                            <TableCell><b>From - To</b></TableCell>
                            <TableCell><b>Notes</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {reservedRoom?.reservations.map((reserve, i) => (
                            <TableRow>
                                <TableCell>{i + 1}</TableCell>
                                <TableCell>{reserve.reservedBy}</TableCell>
                                <TableCell>
                                    {moment(reserve.from).format('lll')} - {moment(reserve.to).format('lll')}
                                </TableCell>
                                <TableCell>{reserve.notes}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <AddReservationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                room={reservedRoom}
            />
        </Box>

    );
}

export default RoomDeatils;