// ** Icon imports
import Login from 'mdi-material-ui/Login'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import AccountPlusOutline from 'mdi-material-ui/AccountPlusOutline'

const navigation = () => {
  return [
    {
      title: 'Dashboard',
      icon: HomeOutline,
      path: '/dashboard'
    },
    {
      sectionTitle: 'Domaines'
    },
    {
      title: 'Perdus',
      icon: Login,
      path: '/dashboard/listing',
      openInNewTab: false
    },
    {
      title: 'Achetés',
      icon: Login,
      path: '/dashboard/nos-domaines',
      openInNewTab: false
    },
    {
      title: 'Ajouter',
      icon: AccountPlusOutline,
      path: '/dashboard/whois',
      openInNewTab: false
    }
  ]
}

export default navigation
