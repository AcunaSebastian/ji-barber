import Nav from "@/components/Nav";
import { HoursWidget } from "./_components/hours-widget";
import { getBarberShopById, getServices } from "./actions";

export const revalidate = 60;

export default async function Home() {

  const services = await getServices();
  const barbershnop = await getBarberShopById();

  return (<>
    <Nav barbershop={barbershnop} />
    <header id="top" className="hero">
      <div className="hero-meta-top">
        <span className="mono">EST · COMPANY</span>
        <span className="mono">Barbería de autor · Chile</span>
        <span className="mono">2024 / 26</span>
      </div>

      <div className="hero-vbar"></div>

      <div className="hero-headline">
        <h1>
          <span className="line">Cortes</span>
          <span className="line outline">que</span>
          <span className="line">imponen<span className="slash">.</span></span>
        </h1>
        <p className="lede">
          Barbería de autor con foco en el oficio. Fades milimétricos, barbas
          esculpidas y rituales de toalla caliente. Sin atajos. Sin tonos suaves.
          Solo el corte que tu cabeza pide.
        </p>
        <div className="hero-actions">
          <a className="btn btn-primary" data-reserve href="#" target="_blank" rel="noopener">
            Reservar turno <span className="arrow">→</span>
          </a>
          <a className="btn btn-ghost" href="#services">Ver servicios</a>
        </div>
      </div>

      <aside className="hero-aside">
        <div className="hero-logo-frame">
          <img src={barbershnop?.logo} alt={barbershnop?.name} />
        </div>
        <div className="hero-stats">
          <div className="hero-stat">
            <div className="num">08</div>
            <div className="lbl">Años</div>
          </div>
          <div className="hero-stat">
            <div className="num">12K</div>
            <div className="lbl">Cortes</div>
          </div>
          <div className="hero-stat">
            <div className="num">4.9</div>
            <div className="lbl">Rating</div>
          </div>
        </div>
      </aside>
    </header>

    <div className="marquee">
      <div className="marquee-track">
        <span className="marquee-item">Fade <span className="dot"></span></span>
        <span className="marquee-item outline">Barba</span>
        <span className="marquee-item">Diseño <span className="dot"></span></span>
        <span className="marquee-item outline">Navaja</span>
        <span className="marquee-item">Ritual <span className="dot"></span></span>
        <span className="marquee-item outline">Toalla caliente</span>
        <span className="marquee-item">Estilo <span className="dot"></span></span>
      </div>
    </div>

    <section id="services">
      <div className="section-head">
        <div className="label">
          <span className="mono">SECCIÓN · 01</span>
          <h2>Servicios.</h2>
        </div>
        <p className="kicker">
          Tarifas claras. Tiempos respetados. Cada servicio incluye lavado,
          asesoría de estilo y producto profesional. Reserva el que necesitas.
        </p>
      </div>

      <div id="svc-list" className="svc-list">
        {
          services.length > 0 ? services.map((service, idx) => {
            return <div className="svc-row" rel="noopener" key={idx}>
              <div className="idx">{String(idx + 1).padStart(2, '0')}</div>
              <div className="name">{service.name}</div>
              <div className="desc">{service.desc}</div>
              <div className="price">{service.price} <small>{service.dur}</small></div>
            </div>
          }) : <div><span>Sin servicios disponibles</span> </div>
        }

      </div>
    </section>

    <div className="marquee">
      <div className="marquee-track">
        <span className="marquee-item outline">Reserva online</span>
        <span className="marquee-item">24 / 7 <span className="dot"></span></span>
        <span className="marquee-item outline">Sin esperas</span>
        <span className="marquee-item">Hombres <span className="dot"></span></span>
        <span className="marquee-item outline">Niños</span>
        <span className="marquee-item">Walk-ins <span className="dot"></span></span>
      </div>
    </div>

    <section id="gallery">
      <div className="section-head">
        <div className="label">
          <span className="mono">SECCIÓN · 02</span>
          <h2>Trabajo.</h2>
        </div>
        <p className="kicker">
          Una mirada al taller. Cortes recientes, atmósfera y detalles que
          hacen al oficio. Arrastra tus fotos para llenar los espacios.
        </p>
      </div>

      <div className="gallery-grid">
        {


          ((barbershnop?.gallery?.length ?? 0) > 0)
            ? barbershnop!.gallery.map((gallery, idx) => (
              <div className={`gallery-cell g-c${idx + 1} `} key={idx}>
                <img src={gallery} alt="Imagen de barberia" />
              </div>
            ))
            : <div></div>


        }
      </div>
    </section>

    <section id="about">
      <div className="section-head">
        <div className="label">
          <span className="mono">SECCIÓN · 03</span>
          <h2>Estudio.</h2>
        </div>
        <p className="kicker">
          Lo que somos. Lo que hacemos. Y por qué nuestros clientes siempre
          vuelven a sentarse en la misma silla.
        </p>
      </div>

      <div className="about-grid">
        <div className="about-copy">
          <h3>Sin atajos<br />al oficio.</h3>
          <p>
            {barbershnop?.name} nace de la obsesión por el corte limpio. Cada cliente
            entra con una idea y sale con algo que le calza. No vendemos cortes,
            cuidamos cabezas: estudiamos la forma, el remolino, el largo y la
            intención antes de tocar una máquina.
          </p>
          <p>
            Trabajamos sobre cita, en bloques exclusivos, para que nadie espere
            de pie. Llega cinco minutos antes. Siéntate. Toma agua. Conversamos lo
            que necesitas. Y empezamos.
          </p>

          <div className="about-quote">
            <p>"Un corte bien hecho dura todo el mes. Un buen ritual, todo el año."</p>
            <div className="sig">— J. JIMÉNEZ, MAESTRO BARBERO</div>
          </div>
        </div>

        <HoursWidget hours={barbershnop?.businessHours ?? []} />
      </div>
    </section>

    <section id="contact">
      <div className="section-head">
        <div className="label">
          <span className="mono">SECCIÓN · 04</span>
          <h2>Contacto.</h2>
        </div>
        <p className="kicker">
          Sigue al estudio en redes para ver los últimos cortes, novedades
          del local y promociones para clientes habituales.
        </p>
      </div>

      <div className="contact-grid">
        <div className="contact-block">
          <div className="contact-card">
            <div className="lbl">Dirección</div>
            <div className="val">{barbershnop?.street || "—"}{barbershnop?.local ? `, ${barbershnop.local}` : ""}</div>
            <div className="sub">{[barbershnop?.city, barbershnop?.country].filter(Boolean).join(", ") || ""}</div>
          </div>
          <div className="contact-card">
            <div className="lbl">Teléfono · WhatsApp</div>
            <div className="val">+56 9 1234 5678</div>
            <div className="sub">Lun a Sáb · respuesta en 30 min</div>
          </div>
          <div className="contact-card">
            <div className="lbl">Email</div>
            <div className="val"><a href="/cdn-cgi/l/email-protection" className="__cf_email__" data-cfemail="10787f7c71507a7a7271627275623e737c">[email&#160;protected]</a></div>
            <div className="sub">Para consultas y bookings privados</div>
          </div>
        </div>

        <div className="contact-block">
          <div className="contact-card" style={{
            borderColor: "rgba(255, 255, 255, 0.2)",
            background: "var(--ink-2)"
          }}>
            <div className="lbl">Redes</div>
            <div className="val" style={{
              fontSize: "22px",
              lineHeight: "1.2"
            }}>
              Donde mostramos el oficio.
            </div>
          </div>

          <div className="socials">
            {barbershnop?.socials.instagram && (
              <a className="social-tile" href={barbershnop.socials.instagram.url || "#"} target="_blank" rel="noopener">
                <div className="plat"><span>Instagram</span><span>↗</span></div>
                <div className="handle">{barbershnop.socials.instagram.handle}</div>
              </a>
            )}
            {barbershnop?.socials.tiktok && (
              <a className="social-tile" href={barbershnop.socials.tiktok.url || "#"} target="_blank" rel="noopener">
                <div className="plat"><span>TikTok</span><span>↗</span></div>
                <div className="handle">{barbershnop.socials.tiktok.handle}</div>
              </a>
            )}
            {barbershnop?.socials.whatsapp && (
              <a className="social-tile" href={barbershnop.socials.whatsapp.url || "#"} target="_blank" rel="noopener">
                <div className="plat"><span>WhatsApp</span><span>↗</span></div>
                <div className="handle">{barbershnop.socials.whatsapp.handle}</div>
              </a>
            )}
            {barbershnop?.socials.youtube && (
              <a className="social-tile" href={barbershnop.socials.youtube.url || "#"} target="_blank" rel="noopener">
                <div className="plat"><span>YouTube</span><span>↗</span></div>
                <div className="handle">{barbershnop.socials.youtube.handle}</div>
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="cta-band">
        <h3>Tu silla<br />te espera.</h3>
        <a className="btn-band" data-reserve href="#" target="_blank" rel="noopener">
          Reservar ahora <span>→</span>
        </a>
      </div>
    </section >

    <footer>
      <div className="foot-top">
        <div>
          <h4>{barbershnop?.name}</h4>
          <ul>
            {barbershnop?.street && <li>{barbershnop.street}{barbershnop.local ? `, ${barbershnop.local}` : ""}</li>}
            {(barbershnop?.city || barbershnop?.country) && <li>{[barbershnop?.city, barbershnop?.country].filter(Boolean).join(", ")}</li>}
          </ul>
        </div>
        <div>
          <h4>NAVEGAR</h4>
          <ul>
            <li><a href="#services">Servicios</a></li>
            <li><a href="#gallery">Galería</a></li>
            <li><a href="#about">Estudio</a></li>
            <li><a href="#contact">Contacto</a></li>
          </ul>
        </div>
        <div>
          <h4>SÍGUENOS</h4>
          <ul>
            {barbershnop?.socials.instagram && (
              <li><a href={barbershnop.socials.instagram.url || "#"} target="_blank" rel="noopener">Instagram</a></li>
            )}
            {barbershnop?.socials.tiktok && (
              <li><a href={barbershnop.socials.tiktok.url || "#"} target="_blank" rel="noopener">TikTok</a></li>
            )}
            {barbershnop?.socials.whatsapp && (
              <li><a href={barbershnop.socials.whatsapp.url || "#"} target="_blank" rel="noopener">WhatsApp</a></li>
            )}
            {barbershnop?.socials.youtube && (
              <li><a href={barbershnop.socials.youtube.url || "#"} target="_blank" rel="noopener">YouTube</a></li>
            )}
          </ul>
        </div>
      </div>

      <div className="foot-big">{barbershnop?.name}</div>

      <div className="foot-bottom">
        <span>© 2026 {barbershnop?.name}</span>
        <span>EST · COMPANY · CL</span>
      </div>
    </footer>

  </>);
}
