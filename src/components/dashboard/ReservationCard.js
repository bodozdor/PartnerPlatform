import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity 
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { COLORS } from '../../styles/colors';
import { translations } from '../../utils/translations';
import { formatDate, formatTime } from '../../utils/helpers';
import Card from '../common/Card';

/**
 * ReservationCard component
 * @param {object} reservation - Reservation data
 * @param {function} onUpdateStatus - Function to call when status is updated
 * @param {string} type - Business type
 */
const ReservationCard = ({ 
  reservation, 
  onUpdateStatus,
  type = 'restaurant'
}) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return '#F5A623'; // Orange
      case 'confirmed':
        return '#4CAF50'; // Green
      case 'completed':
        return '#2196F3'; // Blue
      case 'canceled':
        return '#F44336'; // Red
      default:
        return COLORS.grey;
    }
  };
  
  const getStatusText = (status) => {
    switch (status) {
      case 'pending':
        return translations.pending;
      case 'confirmed':
        return translations.confirmed;
      case 'completed':
        return translations.completed;
      case 'canceled':
        return translations.canceled;
      default:
        return status;
    }
  };
  
  const renderReservationContent = () => {
    // Shared fields
    const clientName = reservation.client_name || 'Klijent';
    const clientPhone = reservation.client_phone || '';
    const clientEmail = reservation.client_email || '';
    const notes = reservation.notes || '';
    const status = reservation.status || 'pending';
    
    // Type-specific fields
    if (type === 'restaurant' || type === 'cafebar') {
      const date = formatDate(reservation.reservation_date);
      const time = formatTime(reservation.reservation_time);
      const numPeople = reservation.num_people || 1;
      
      return (
        <>
          <View style={styles.row}>
            <View style={styles.infoItem}>
              <Feather name="calendar" size={16} color={COLORS.primary} />
              <Text style={styles.infoText}>{date}</Text>
            </View>
            
            <View style={styles.infoItem}>
              <Feather name="clock" size={16} color={COLORS.primary} />
              <Text style={styles.infoText}>{time}</Text>
            </View>
            
            <View style={styles.infoItem}>
              <Feather name="users" size={16} color={COLORS.primary} />
              <Text style={styles.infoText}>{numPeople} {translations.people}</Text>
            </View>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.clientInfo}>
            <Text style={styles.clientName}>{clientName}</Text>
            
            {clientPhone && (
              <View style={styles.contactItem}>
                <Feather name="phone" size={14} color={COLORS.grey} />
                <Text style={styles.contactText}>{clientPhone}</Text>
              </View>
            )}
            
            {clientEmail && (
              <View style={styles.contactItem}>
                <Feather name="mail" size={14} color={COLORS.grey} />
                <Text style={styles.contactText}>{clientEmail}</Text>
              </View>
            )}
          </View>
          
          {notes && (
            <>
              <View style={styles.divider} />
              <View style={styles.notesContainer}>
                <Text style={styles.notesLabel}>{translations.notes}</Text>
                <Text style={styles.notesText}>{notes}</Text>
              </View>
            </>
          )}
        </>
      );
    } 
    else if (type === 'accommodation') {
      const checkInDate = formatDate(reservation.check_in_date);
      const checkOutDate = formatDate(reservation.check_out_date);
      const numGuests = reservation.num_people || 1;
      const roomType = reservation.room_type || '';
      
      return (
        <>
          <View style={styles.row}>
            <View style={styles.infoItem}>
              <Feather name="log-in" size={16} color={COLORS.primary} />
              <Text style={styles.infoText}>{translations.checkIn}: {checkInDate}</Text>
            </View>
            
            <View style={styles.infoItem}>
              <Feather name="log-out" size={16} color={COLORS.primary} />
              <Text style={styles.infoText}>{translations.checkOut}: {checkOutDate}</Text>
            </View>
          </View>
          
          <View style={styles.row}>
            <View style={styles.infoItem}>
              <Feather name="users" size={16} color={COLORS.primary} />
              <Text style={styles.infoText}>{numGuests} {translations.guests}</Text>
            </View>
            
            {roomType && (
              <View style={styles.infoItem}>
                <Feather name="home" size={16} color={COLORS.primary} />
                <Text style={styles.infoText}>{roomType}</Text>
              </View>
            )}
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.clientInfo}>
            <Text style={styles.clientName}>{clientName}</Text>
            
            {clientPhone && (
              <View style={styles.contactItem}>
                <Feather name="phone" size={14} color={COLORS.grey} />
                <Text style={styles.contactText}>{clientPhone}</Text>
              </View>
            )}
            
            {clientEmail && (
              <View style={styles.contactItem}>
                <Feather name="mail" size={14} color={COLORS.grey} />
                <Text style={styles.contactText}>{clientEmail}</Text>
              </View>
            )}
          </View>
          
          {notes && (
            <>
              <View style={styles.divider} />
              <View style={styles.notesContainer}>
                <Text style={styles.notesLabel}>{translations.notes}</Text>
                <Text style={styles.notesText}>{notes}</Text>
              </View>
            </>
          )}
        </>
      );
    }
    else if (type === 'fitness' || type === 'beauty') {
      const date = formatDate(reservation.reservation_date);
      const time = formatTime(reservation.reservation_time);
      const service = reservation.service || '';
      const duration = reservation.duration ? `${reservation.duration} min` : '';
      
      return (
        <>
          <View style={styles.row}>
            <View style={styles.infoItem}>
              <Feather name="calendar" size={16} color={COLORS.primary} />
              <Text style={styles.infoText}>{date}</Text>
            </View>
            
            <View style={styles.infoItem}>
              <Feather name="clock" size={16} color={COLORS.primary} />
              <Text style={styles.infoText}>{time}</Text>
            </View>
          </View>
          
          <View style={styles.row}>
            {service && (
              <View style={styles.infoItem}>
                <Feather 
                  name={type === 'fitness' ? 'activity' : 'scissors'} 
                  size={16} 
                  color={COLORS.primary} 
                />
                <Text style={styles.infoText}>{service}</Text>
              </View>
            )}
            
            {duration && (
              <View style={styles.infoItem}>
                <Feather name="clock" size={16} color={COLORS.primary} />
                <Text style={styles.infoText}>{duration}</Text>
              </View>
            )}
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.clientInfo}>
            <Text style={styles.clientName}>{clientName}</Text>
            
            {clientPhone && (
              <View style={styles.contactItem}>
                <Feather name="phone" size={14} color={COLORS.grey} />
                <Text style={styles.contactText}>{clientPhone}</Text>
              </View>
            )}
            
            {clientEmail && (
              <View style={styles.contactItem}>
                <Feather name="mail" size={14} color={COLORS.grey} />
                <Text style={styles.contactText}>{clientEmail}</Text>
              </View>
            )}
          </View>
          
          {notes && (
            <>
              <View style={styles.divider} />
              <View style={styles.notesContainer}>
                <Text style={styles.notesLabel}>{translations.notes}</Text>
                <Text style={styles.notesText}>{notes}</Text>
              </View>
            </>
          )}
        </>
      );
    }
    else if (type === 'adventure') {
      const date = formatDate(reservation.reservation_date);
      const time = formatTime(reservation.reservation_time);
      const activity = reservation.service || '';
      const numPeople = reservation.num_people || 1;
      
      return (
        <>
          <View style={styles.row}>
            <View style={styles.infoItem}>
              <Feather name="calendar" size={16} color={COLORS.primary} />
              <Text style={styles.infoText}>{date}</Text>
            </View>
            
            <View style={styles.infoItem}>
              <Feather name="clock" size={16} color={COLORS.primary} />
              <Text style={styles.infoText}>{time}</Text>
            </View>
            
            <View style={styles.infoItem}>
              <Feather name="users" size={16} color={COLORS.primary} />
              <Text style={styles.infoText}>{numPeople} {translations.people}</Text>
            </View>
          </View>
          
          {activity && (
            <View style={styles.row}>
              <View style={styles.infoItem}>
                <Feather name="compass" size={16} color={COLORS.primary} />
                <Text style={styles.infoText}>{activity}</Text>
              </View>
            </View>
          )}
          
          <View style={styles.divider} />
          
          <View style={styles.clientInfo}>
            <Text style={styles.clientName}>{clientName}</Text>
            
            {clientPhone && (
              <View style={styles.contactItem}>
                <Feather name="phone" size={14} color={COLORS.grey} />
                <Text style={styles.contactText}>{clientPhone}</Text>
              </View>
            )}
            
            {clientEmail && (
              <View style={styles.contactItem}>
                <Feather name="mail" size={14} color={COLORS.grey} />
                <Text style={styles.contactText}>{clientEmail}</Text>
              </View>
            )}
          </View>
          
          {notes && (
            <>
              <View style={styles.divider} />
              <View style={styles.notesContainer}>
                <Text style={styles.notesLabel}>{translations.notes}</Text>
                <Text style={styles.notesText}>{notes}</Text>
              </View>
            </>
          )}
        </>
      );
    }
    
    // Default fallback
    return (
      <View style={styles.clientInfo}>
        <Text style={styles.clientName}>{clientName}</Text>
        
        {clientPhone && (
          <View style={styles.contactItem}>
            <Feather name="phone" size={14} color={COLORS.grey} />
            <Text style={styles.contactText}>{clientPhone}</Text>
          </View>
        )}
        
        {clientEmail && (
          <View style={styles.contactItem}>
            <Feather name="mail" size={14} color={COLORS.grey} />
            <Text style={styles.contactText}>{clientEmail}</Text>
          </View>
        )}
      </View>
    );
  };
  
  return (
    <Card style={styles.card}>
      <View style={styles.statusContainer}>
        <View style={[styles.statusIndicator, { backgroundColor: getStatusColor(reservation.status) }]} />
        <Text style={styles.statusText}>{getStatusText(reservation.status)}</Text>
      </View>
      
      {renderReservationContent()}
      
      {reservation.status === 'pending' && (
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={[styles.actionButton, styles.confirmButton]}
            onPress={() => onUpdateStatus(reservation.id, 'confirmed')}
          >
            <Feather name="check" size={16} color={COLORS.white} />
            <Text style={styles.actionButtonText}>{translations.confirm}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.actionButton, styles.cancelButton]}
            onPress={() => onUpdateStatus(reservation.id, 'canceled')}
          >
            <Feather name="x" size={16} color={COLORS.white} />
            <Text style={styles.actionButtonText}>{translations.cancel}</Text>
          </TouchableOpacity>
        </View>
      )}
      
      {reservation.status === 'confirmed' && (
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={[styles.actionButton, styles.completeButton]}
            onPress={() => onUpdateStatus(reservation.id, 'completed')}
          >
            <Feather name="check-circle" size={16} color={COLORS.white} />
            <Text style={styles.actionButtonText}>{translations.markAsCompleted}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.actionButton, styles.cancelButton]}
            onPress={() => onUpdateStatus(reservation.id, 'canceled')}
          >
            <Feather name="x" size={16} color={COLORS.white} />
            <Text style={styles.actionButtonText}>{translations.cancel}</Text>
          </TouchableOpacity>
        </View>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  statusIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 6,
  },
  statusText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.dark,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    marginBottom: 4,
  },
  infoText: {
    fontSize: 14,
    color: COLORS.dark,
    marginLeft: 5,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.lightGrey,
    marginVertical: 10,
  },
  clientInfo: {
    marginBottom: 8,
  },
  clientName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.dark,
    marginBottom: 5,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2,
  },
  contactText: {
    fontSize: 14,
    color: COLORS.grey,
    marginLeft: 5,
  },
  notesContainer: {
    marginTop: 5,
  },
  notesLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.dark,
    marginBottom: 4,
  },
  notesText: {
    fontSize: 14,
    color: COLORS.grey,
    fontStyle: 'italic',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    flex: 1,
    marginHorizontal: 5,
  },
  confirmButton: {
    backgroundColor: '#4CAF50',
  },
  cancelButton: {
    backgroundColor: '#F44336',
  },
  completeButton: {
    backgroundColor: '#2196F3',
  },
  actionButtonText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 14,
    marginLeft: 5,
  },
});

export default ReservationCard;
