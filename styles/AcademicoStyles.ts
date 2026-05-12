import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F2FA',
    paddingTop: 50,
    paddingHorizontal: 16,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    gap: 10,
    flexWrap: 'wrap',
  },

  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    gap: 10,
  },

  tab: {
    backgroundColor: '#E7DDF5',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
  },

  activeTab: {
    backgroundColor: '#8A56AC',
  },

  tabText: {
    color: '#5B3A75',
    fontWeight: '600',
  },

  activeTabText: {
    color: '#FFF',
  },

  section: {
    backgroundColor: '#FFF',
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#5B3A75',
  },

  addBtn: {
    backgroundColor: '#8A56AC',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 10,
  },

  addText: {
    color: '#FFF',
    fontWeight: 'bold',
  },

  item: {
    fontSize: 15,
    color: '#333',
    marginBottom: 6,
  },

  emptyText: {
    color: '#888',
    fontStyle: 'italic',
  },

  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },

  deleteButton: {
    padding: 8,
  },

  deleteText: {
    color: '#ff5c5c',
    fontWeight: 'bold',
  },

  approvedText: {
    color: 'green',
  },

  reprovedText: {
    color: 'red',
  },

  mediaText: {
    marginTop: 10,
    fontWeight: 'bold',
    color: '#8A56AC',
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  modalContainer: {
    width: '100%',
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 20,
  },

  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#8A56AC',
    textAlign: 'center',
    marginBottom: 20,
  },

  input: {
    backgroundColor: '#F3EDF9',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 14,
    color: '#333',
  },

  modalButton: {
    backgroundColor: '#8A56AC',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },

  modalButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },

  cancelText: {
    textAlign: 'center',
    marginTop: 14,
    color: '#8A56AC',
    fontWeight: '600',
  },

  chartContainer: {
    alignItems: 'center',
    marginVertical: 15,
  },

  chartStyle: {
    borderRadius: 16,
  },

  mediaGeralText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#8A56AC',
    marginTop: 10,
  },

  boletimContainer: {
    width: '92%',
    maxHeight: '80%',
  },

  boletimSection: {
    marginBottom: 20,
  },

  boletimTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#8A56AC',
    marginBottom: 10,
  },

  boletimCard: {
    backgroundColor: '#F4F0FA',
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
  },

  boletimDisciplina: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },

  boletimNota: {
    marginTop: 5,
    fontSize: 15,
  },

  boletimMedia: {
    marginTop: 5,
    fontWeight: 'bold',
    color: '#8A56AC',
  },

  boletimFooter: {
    borderTopWidth: 1,
    borderColor: '#DDD',
    paddingTop: 15,
    marginTop: 10,
  },
});

export default styles;