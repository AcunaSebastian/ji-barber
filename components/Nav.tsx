import { BarberShop } from "@/lib/intefaces"

interface Props {
  barbershop: BarberShop | null,
}
export default function Nav({ barbershop }: Props) {



  return <nav className="nav">
    <a className="nav-brand" href="#top">
      {barbershop?.logo && <img src={barbershop.logo} alt={barbershop.name} />}
      <div>
        <div className="name">{barbershop?.name}</div>
        <span className="sub">EST · COMPANY</span>
      </div>
    </a>

    <div className="nav-links">
      <a href="#services">Servicios</a>
      <a href="#gallery">Galería</a>
      <a href="#about">Estudio</a>
      <a href="#contact">Contacto</a>
    </div>

    <a className="nav-cta" data-reserve href="#" target="_blank" rel="noopener">
      Reservar <span className="arrow">→</span>
    </a>
  </nav>
}
