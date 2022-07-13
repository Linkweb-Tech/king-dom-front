// ** Icon imports
import Login from 'mdi-material-ui/Login'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import AccountPlusOutline from 'mdi-material-ui/AccountPlusOutline'

const navigation = () => {
  return [
    {
      title: 'Dashboard',
      icon: HomeOutline,
      path: '/'
    },
    {
      sectionTitle: 'Domaines'
    },
    {
      title: 'Liste',
      icon: Login,
      path: '/pages/login',
      openInNewTab: false
    },
    {
      title: 'Ajouter',
      icon: AccountPlusOutline,
      path: '/whois',
      openInNewTab: false
    }
  ]
}

export default navigation
