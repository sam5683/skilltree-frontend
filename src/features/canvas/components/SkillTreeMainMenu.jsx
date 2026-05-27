import { MainMenu } from "@excalidraw/excalidraw"

function SkillTreeMainMenu({
  onUploadImage,
  onSemanticSearch,
  onRenameNote,
  onDeleteNote
}) {

  function closeMobileMenu() {

    const closeButton =
      document.querySelector(
        '[data-testid="main-menu-trigger"]'
      )

    closeButton?.click()

  }

  function handleMenuAction(action) {

    action()

    /*
      CLOSE MOBILE MENU
    */

    setTimeout(() => {

      closeMobileMenu()

    }, 50)

  }

  return (

    <MainMenu
      className="
        max-h-[52vh]
        overflow-y-auto
      "
    >

      <MainMenu.Item
        onSelect={() =>
          handleMenuAction(onUploadImage)
        }
      >
        Upload Image
      </MainMenu.Item>

      <MainMenu.Item
        onSelect={() =>
          handleMenuAction(onSemanticSearch)
        }
      >
        Semantic Search
      </MainMenu.Item>

      <MainMenu.Item
        onSelect={() =>
          handleMenuAction(onRenameNote)
        }
      >
        Rename Note
      </MainMenu.Item>

      <MainMenu.Item
        onSelect={() =>
          handleMenuAction(onDeleteNote)
        }
      >
        Delete Note
      </MainMenu.Item>

      <MainMenu.Separator />

      <MainMenu.DefaultItems.ClearCanvas />

      <MainMenu.DefaultItems.SaveAsImage />

      <MainMenu.Separator />

      <MainMenu.Item
        onSelect={() => {

          window.open(
            "https://github.com/sam5683",
            "_blank"
          )

          setTimeout(() => {

            closeMobileMenu()

          }, 50)

        }}
      >
        SkillTree GitHub
      </MainMenu.Item>

    </MainMenu>

  )

}

export default SkillTreeMainMenu