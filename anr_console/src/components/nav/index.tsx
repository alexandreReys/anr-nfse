import { Fragment, useContext } from "react";
import Link from "next/link";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline';
import { AuthContext } from "../../context/authContext/AuthContext";

const profile = ['Your Profile', 'Settings'];

type ClassValue = string | undefined | null;

function classNames(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(' ')
}

export default function Nav() {
  const { user } = useContext(AuthContext);

  const DropdownMotoristas = () => {
    return(
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
            Motoristas
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="origin-top-right absolute left-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
            <Menu.Item>
              <Link href="/Motoristas">
                <span className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                  Incluir
                </span>
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link href="/MotoristasLista">
                <span className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                  Cadastro
                </span>
              </Link>
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    )
  }

  const DropdownVeiculos = () => {
    return(
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
            Veiculos
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="origin-top-right absolute left-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
            <Menu.Item>
              <Link href="/Veiculos">
                <span className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                  Incluir
                </span>
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link href="/VeiculosLista">
                <span className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                  Cadastro
                </span>
              </Link>
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    )
  }

  const DropdownCargas = () => {
    return(
      <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
          Cargas
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute left-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
          <Menu.Item>
            <Link href="/Cargas">
              <span className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                Incluir
              </span>
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link href="/CargasLista">
              <span className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                Cadastro
              </span>
            </Link>
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
    )
  }

  const DropdownRelatorios = () => {
    return(
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
            Relatórios
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="origin-top-right absolute left-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
            <Menu.Item>
              <Link href="/RelatViagensRecentes">
                <span className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                  Viagens recentes
                </span>
              </Link>
            </Menu.Item>
          </Menu.Items>
        </Transition>
    </Menu>
    )
  }

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">

              {/* DESKTOP MENU */}
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <img
                    className="h-8 w-8"
                    src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                    alt="Workflow"
                  />
                </div>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    
                    <Link href="/Dashboard">
                      <span className="text-yellow-500 bg-black hover:bg-gray-900 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                        D A S H B O A R D
                      </span>
                    </Link>

                    {/* <Link href="/Cep">
                      <span className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                        Cep
                      </span>
                    </Link> */}

                    <DropdownMotoristas />

                    <DropdownVeiculos />

                    <DropdownCargas />

                    <DropdownRelatorios />
                  </div>
                </div>

              </div>

              {/* NOTIFICATIONS ANR PROFILE BUTTONS */}
              <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6">

                  {/* NOTIFICATIONS BUTTON */}
                  <button className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>

                  {/* PROFILE DROPDOWN */}
                  <Menu as="div" className="ml-3 relative z-50">
                    {({ open }) => (
                      <>
                        <div>
                          <Menu.Button className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                            <span className="sr-only">Open user menu</span>
                            <img
                              className="h-8 w-8 rounded-full"
                              src={user?.avatar_url}
                              alt=""
                            />
                          </Menu.Button>
                        </div>
                        <Transition
                          show={open}
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items
                            static
                            className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                          >
                            {profile.map((item) => (
                              <Menu.Item key={item}>
                                {({ active }) => (
                                  <a
                                    href="#"
                                    className={classNames(
                                      active ? 'bg-gray-100' : '',
                                      'block px-4 py-2 text-sm text-gray-700'
                                    )}
                                  >
                                    {item}
                                  </a>
                                )}
                              </Menu.Item>
                            ))}
                            <Menu.Item>
                              <a
                                href="/"
                                className='block px-4 py-2 text-sm text-gray-700'
                              >
                                Sign out
                              </a>
                            </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      </>
                    )}
                  </Menu>

                </div>
              </div>

              {/* MOBILE MENU BUTTON */}
              <div className="-mr-2 flex md:hidden">

                <Disclosure.Button className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>

              </div>

            </div>
          </div>

          {/* MOBILE MODAL */}
          <Disclosure.Panel className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">

              <a href="#" className="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium">
                D A S H B O A R D
              </a>

              <p>
                <DropdownMotoristas />
              </p>

              <p>
                <DropdownVeiculos />
              </p>

              <p>
                <DropdownCargas />
              </p>

              <p>
                <DropdownRelatorios />
              </p>

            </div>
            
            <div className="pt-4 pb-3 border-t border-gray-700">
              <div className="flex items-center px-5">
                <div className="flex-shrink-0">
                  <img
                    className="h-10 w-10 rounded-full"
                    src={user?.avatar_url}
                    alt=""
                  />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium leading-none text-white">
                    Developer ANR
                  </div>
                  <div className="text-sm font-medium leading-none text-gray-400">
                    dev@anrsistemas.com.br
                  </div>
                </div>
                <button className="ml-auto bg-gray-800 flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-3 px-2 space-y-1">
                {profile.map((item) => (
                  <a
                    key={item}
                    href="#"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                  >
                    {item}
                  </a>
                ))}
                <a
                  href="/"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                >
                  Sign out
                </a>
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}