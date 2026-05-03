import { StyleSheet } from 'react-native';

const FinanceStyles = StyleSheet.create({
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

  subHeader: {
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

    // sombra iOS
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },

    // sombra Android
    elevation: 2,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#7B61FF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  addText: {
    color: '#7B61FF',
    fontSize: 18,
    fontWeight: 'bold',
  },

  profileBtn: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FinanceStyles;