import { StyleSheet } from 'react-native';

const FitnessStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7FB',
    paddingTop: 50,
    paddingHorizontal: 20,
  },

  header: {
    flexDirection: 'row',
    marginBottom: 20,
  },

  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#E5E5EF',
    borderRadius: 20,
    marginRight: 10,
  },

  activeTab: {
    backgroundColor: '#7B61FF',
  },

  tabText: {
    color: '#777',
    fontSize: 14,
  },

  activeTabText: {
    color: '#FFF',
    fontWeight: 'bold',
  },

  section: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,

    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },

    elevation: 2,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },

  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },

  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },

  item: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },

  addBtn: {
    backgroundColor: '#EDEBFF',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },

  addText: {
    color: '#7B61FF',
    fontSize: 12,
    fontWeight: '500',
  },

  // MODAL
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },

  modalContainer: {
    backgroundColor: '#FFF',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  modalTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },

  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
  },

  modalButton: {
    backgroundColor: '#7B61FF',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },

  modalButtonText: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: '600',
  },

  cancelText: {
    textAlign: 'center',
    color: '#777',
  },
});

export default FitnessStyles;